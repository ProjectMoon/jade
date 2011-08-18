var jadeParser = require('./jade-parser');
var ASTNode = require('./jade-parser').ASTNode;

var asyncLevel = 0;
var currAsyncCode = '';

function handleAsyncWrapping() {
	var wrapping = '';
	for (var c = asyncLevel; c > 0; c--) {
		wrapping += '});';
	}
	
	currAsyncCode = '';
	return wrapping;
}

var ASTParser = {
	"Expression": function(left, right) {
		if (left != null) {
			return '' + left;
		}
		else {
			return '';
		}
	},
	
	"+": function(left, right) {
		return left + '+' + right;
	},
	
	"-": function(left, right) {
		return left + '-' + right;
	},
	
	"Property": function(left, right) {
		return left + '.' + right;
	},
	
	"FunctionDef": function(left, right) {
		var formalParams = right.formalParams;
		if (formalParams == null) formalParams = '';
		
		var body = handle(right.body); //this is an AST in itself.
		body += handleAsyncWrapping();
		
		return 'var ' + left + '=function ' + left + '(' + formalParams + '){' + body + '}';
	},
	
	"FunctionCall": function(left, right) {
		if (right != null) {
			return left + '(' + right + ')';
		}
		else {
			return left + '()';
		}
	},
	
	"AsyncCall": function(left, right) {
		asyncLevel++;
		if (right != null) {
			currAsyncCode = left + '(' + right + ', function() {';
		}
		else {
			currAsyncCode = left + '(function() {';
		}
		
		return currAsyncCode;
	},
	
	"If": function(left, right) {
		right += handleAsyncWrapping();
		return 'if (' + left + ') {' + right + '}';
	},
	
	"InitVariable": function(left, right) {
		if (right === currAsyncCode) {
			//these variables are the result of an unwrapped async
			//call.
			var code = right;
			
			for (var c = 0; c < left.idents.length; c++) {
				code += 'var ' + left.idents[c] + '=arguments[' + c + '];';
			}
			
			return code;
		}
		else {
			if (left.idents.length === 1) {
				//this is a regular assignment.
				return 'var ' + left.idents[0] + '=' + right;
			}
			else {
				//destructuring assignment.
				var code = 'var __r = ' + right + ';';
				for (var c = 0; c < left.idents.length; c++) {
					var ident = left.idents[c];
					code += 'var ' + ident + '=__r[' + c + '];';
				}
				
				return code;
			}
		}
	},
	
	"AssignVariable": function(left, right) {
		return left + '=' + right;
	}
};

function handle(node) {
	//handling an individual node of the AST tree.
	if (node instanceof ASTNode) {
		var code = '';
		var handler = ASTParser[node.root];
		
		if (typeof handler !== 'undefined') {
			if (node.left != null && (node.left.hasOwnProperty('root') || node.left instanceof Array)) {
				node.left = handle(node.left);
			}

			if (node.right != null && (node.right.hasOwnProperty('root') || node.right instanceof Array)) {
				node.right = handle(node.right);
			}
						
			code += handler(node.left, node.right);
			return code;
		}
		else {
			console.log('warning: no handler defined for ' + node.root);
		}
	}
	//the node is a list of AST nodes, so put a ; after each one.
	else if (node instanceof Array) {
		var code = '';
		node.forEach(function(entry) {
			code += handle(entry) + ';';
		});
		return code;
	}
	else {
		console.log('nothing found to handle ' + JSON.stringify(node));
	}
}

jadeParser.parser.parse('1;');
var program = jadeParser.parseResult;
//eval(handle(program) + handleAsyncWrapping());
console.log(handle(program) + handleAsyncWrapping());
