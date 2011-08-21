//there is a fun circular dependency between compiler and the AST...
//think of this as just an organizational mechanism for the compiler,
//rather than access control.

//need startsWith for async unwrapping.
function startsWith(str, text) {
    return str.slice(0, text.length) == text;
}

function endsWith(str, text) {
    return str.slice(0, -text.length) == text;
}

//called by compiler.compile
module.exports.getAST = function() {
	var handle = require('./compiler').handle;
	var endAsyncWrapping = require('./compiler').endAsyncWrapping;
	var increaseAsyncLevel = require('./compiler').increaseAsyncLevel;
	var getAsyncLevel = require('./compiler').getAsyncLevel;
	var setAsyncCode = require('./compiler').setAsyncCode;
	var getAsyncCode = require('./compiler').getAsyncCode;
	
	//used for stuff like =, +, -, etc
	function simpleCopy(text) {
		return function(left, right) {
			return left + text + right;
		}
	}

	function simpleCopyWithAsync(text) {
		return function(left, right) {
			if (getAsyncLevel() === 0) {
				return left + text + right;
			}
			else {
				//async mode!
				return right + left + text + 'arguments[0]';
			}
		}
	}	

	var ASTParser = {
		//core stuff.
		"Empty": function() { return ''; },
		
		"DirectCopy": function(text) {
			return text;
		},
		
		"Block": function(block) {
			if (block != null) {
				return '{' + handle(block) + '}';
			}
			else {
				return '{}';
			}
		},
		
		//assignment.
		"=": simpleCopyWithAsync('='),
		"+=": simpleCopyWithAsync('+='),
		"-=": simpleCopyWithAsync('-='),
		"*=": simpleCopyWithAsync('*='),
		"/=": simpleCopyWithAsync('/='),
		"%=": simpleCopyWithAsync('%='),
		"<<=": simpleCopyWithAsync('<<='),
		">>=": simpleCopyWithAsync('>>='),
		">>>=": simpleCopyWithAsync('>>>='),
		
		//operators.		
		"+": simpleCopy('+'),
		"-": simpleCopy('-'),
		"*": simpleCopy('*'),
		"/": simpleCopy('/'),
		"%": simpleCopy('%'),
		
		//boolean operators
		">": simpleCopy('>'),
		"<": simpleCopy('<'),
		">=": simpleCopy('>='),
		"<=": simpleCopy('<='),
		"||": simpleCopy('||'),
		"&&": simpleCopy('&&'),
		"==": simpleCopy('==='),
		"===": simpleCopy('==='),
		"!=": simpleCopy('!=='),
		"!==": simpleCopy('!=='),
		
		//bitwise operatiors.
		"~": simpleCopy('~'),
		"!": simpleCopy('!'),
		"|": simpleCopy('|'),
		"&": simpleCopy('&'),
		">>": simpleCopy('>>'),
		"<<": simpleCopy('<<'),
		">>>": simpleCopy('>>>'),
		
		//pre/postfix operators
		"++": function(left, right) {
			if (left != null) {
				//prefix
				return '++' + left;
			}
			else {
				//postfix
				return right + '++';
			}
		},
		
		"--": function(left, right) {
			if (left != null) {
				//prefix
				return '--' + left;
			}
			else {
				//postfix
				return right + '--';
			}
		},
		
		//Properties, prototypes
		"Property": simpleCopy('.'),
		"Prototype": simpleCopy('.prototype.'),
				
		//variable declarations and more complex assignment.
		"VariableDeclaration": function(left, right) {
			var code = handle(left, ',', true);

			//transform AST nodes if we are in async unwrapping mode.
			var nonAsyncNodes = [];
			left.forEach(function(node) {
				if (getAsyncLevel() > 0) {
					if (node.right == getAsyncCode()) {
						//only = or DestructuringAssignment
						//should get passed the above if.
						if (node.root === '=') {
							node.root = 'AsyncAssignment';
						}
						else if (node.root === 'DestructuringAssignment') {
							node.root = 'AsyncDestructuringAssignment';
						}
						else {
							console.log('unrecognized node "' + node.root + '" during async unwrapping node transform.');
						}
					}
					else {
						//this should only be DirectCopy nodes, which in this
						//case are stuff like var x, y;
						if (node.root === 'DirectCopy') {
							nonAsyncNodes.push(node);
						}
						else {
							console.log('unrecognized non-async node "' + node.root + '" during async unwrapping transform');
						}
					}
				}
			});
			
			if (getAsyncLevel() === 0) {
				var code = handle(left, ',', true);
				if (startsWith(code, 'var')) {
					return code; //handles destructuring, which puts var for us.
				}
				else {
					return 'var ' + code;
				}
			}
			else {
				//we must first remove all non-async nodes (DirectCopy)
				//otherwise it will cause problems with the returned js.
				nonAsyncNodes.forEach(function(node) {
					var index = left.indexOf(node);
					left.splice(index, 1);
				});
				
				//now, all the DirectCopy nodes must be written as a var
				//statement outside the callback scopes.
				var code = '';
				if (nonAsyncNodes.length > 0) {
					code += 'var ' + handle(nonAsyncNodes, ',', true) + ';';
				}
				
				code += handle(left, ',', true);
				return code;
			}
		},
		
		"DestructuringAssignment": function(idents, expr) {
			if (getAsyncLevel() === 0) {
				var code = 'var __r=' + expr + ';';
				for (var c = 0; c < idents.length; c++) {
					code += 'var ' + idents[c] + '=__r[' + c + '];';
				}
				return code;
			}
			else {
				//delegate to async destructuring assignment
				//instead of bothering with node transforms.
				return ASTParser['AsyncDestructuringAssignment'](idents, expr);
			}
		},
		
		//functions.
		"FunctionExpression": function(info, body) {
			var formalParams = info.formalParameters || '';
			if (formalParams != '') formalParams = handle(formalParams, ',', true);
			
			var name = info.name || '';
			if (name != '') name = ' ' + name;
			
			var code = '';
			if (body != null) {
				code = handle(body) + endAsyncWrapping();
			}
			
			//async functions get a __cb parameter for callback.
			if (info.async === true) {
				if (formalParams === '') formalParams = '__cb';
				else formalParams += ',__cb';
			}
			
			return 'function' + name + '(' + formalParams + '){' + code + '}';
		},
				
		"FunctionDeclaration": function(info, body) {
			var formalParams = info.formalParameters || '';
			if (formalParams != '') formalParams = handle(formalParams, ',', true);
			
			var name = info.ident || '';
			if (name != '') name = ' ' + name;
			
			var code = '';
			if (body != null) {
				code = handle(body) + endAsyncWrapping();
			}	
			
			//async functions get a __cb parameter for callback.
			if (info.async === true) {
				if (formalParams === '') formalParams = '__cb';
				else formalParams += ',__cb';
			}
			
			return 'function' + name + '(' + formalParams + '){' + code + '}';
		},
				
		"FunctionCall": function(left, right) {
			if (right != null) {
				return left + '(' + right + ')';
			}
			else {
				return left + '()';
			}
		},
		
		"FunctionArguments": function(args) {
			if (args != null) {
				args = handle(args, ',', true);
				return args;
			}
			else {
				return '';
			}
		},
		
		//JSON
		"JSON": function(jsonTree) {
			var json = handle(jsonTree, ',', true);
			return '{' + json + '}';
		},
		
		"JSONProperty": function(left, right) {
			return left + ':' + right;
		},
		
		//async unwrapping (note: async unwrapping is handled throughout
		//the ast parser in different places, not just here)
		"AsyncCall": function(left, right) {
			increaseAsyncLevel();
			if (right != null && right != '') {
				setAsyncCode(left + '(' + right + ', function() {');
			}
			else {
				setAsyncCode(left + '(function() {');
			}
			
			return getAsyncCode();
		},
		
		"AsyncAssignment": function(left, right) {
			return right + 'var ' + left + '=arguments[0]';
		},
		
		"AsyncDestructuringAssignment": function(idents, expr) {
			var code = expr;
			for (var c = 0; c < idents.length; c++) {
				code += 'var ' + idents[c] + '=arguments[' + c + '];';
			}
			return code;
		},		
		
		"EndAsync": function() {
				return endAsyncWrapping();
		},
		
		"If": function(condition, block) {
			block += endAsyncWrapping();
			return 'if(' + condition + ')' + block;
		},
		
		"Return": function(left, right) {
			if (left != null) {
				return 'return ' + left;
			}
			else {
				return 'return;'
			}
		},
		
		"AsyncReturn": function(left, right) {
			if (left.values != null) {
				var code = '__cb(';
				
				for (var c = 0; c < left.values.length; c++) {
					code += left.values[c] + ',';
				}
				
				code = code.substr(0, code.length - 1); //get rid of last ,
				code += ');';
				return code;
			}
			else {
				return '__cb();';
			}
		},
		
		//loops.
		"For": function(info, body) {
			var start = handle(info.start);
			var end = handle(info.end);
			var step = handle(info.step, '');
			
			if (!endsWith(start, ';')) start += ';';
			if (!endsWith(end, ';')) end += ';';
			if (endsWith(end, ';')) end = end.substring(0, end.length - 1);
			
			if (getAsyncLevel() === 0) {
				return 'for(' + start + end + step + ')' + body;
			}
			else {
				return start + 'for(;' + end + step + ')' + body;
			}
		},
		
		"ScopedFor": function(info, body) {
			var start = handle(info.start);
			var end = handle(info.end);
			var step = handle(info.step, '');
			
			if (!endsWith(start, ';')) start += ';';
			if (!endsWith(end, ';')) end += ';';
			if (endsWith(end, ';')) end = end.substring(0, end.length - 1);
			
			if (getAsyncLevel() === 0) {
				return 'for(var ' + start + end + step + ')' + body;
			}
			else {
				return start + 'for(;' + end + step + ')' + body;
			}
		},
		
		"ForIn": function(info, body) {
			var each = handle(info.each, '');
			var inExpr = handle(info.inExpr, '');
			
			if (getAsyncLevel() === 0) {
				return 'for(var ' + info.each + ' in ' + inExpr + ')' + body;
			}
			else {
				return inExpr + 'for(' + each + ' in arguments[0])' + body;
			}
		},
		
		"ForInScoped": function(info, body) {
			var inExpr = handle(info.inExpr, '');
			
			if (getAsyncLevel() === 0) {
				return 'for(var ' + info.each + ' in ' + inExpr + ')' + body;
			}
			else {
				return inExpr + 'for(var ' + info.each + ' in arguments[0])' + body;
			}
		},
		
		"While": function(expr, body) {
			if (getAsyncLevel() === 0) {
				return 'while(' + expr + ')' + body;
			}
			else {
				
			}
		}
	};
	
	return ASTParser;
}
