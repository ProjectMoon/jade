var jadeParser = require('./jade-parser');
var ASTNode = require('./jade-parser').ASTNode;

var asyncLevel = 0;

function handleAsyncWrapping() {
	var wrapping = '';
	for (var c = asyncLevel; c > 0; c--) {
		wrapping += '});';
	}
	
	return wrapping;
}

var ASTParser = {
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
			return left + '(' + right + ', function() {';
		}
		else {
			return left + '(function() {';
		}
	},
	
	"If": function(left, right) {
		right += handleAsyncWrapping();
		return 'if (' + left + ') {' + right + '}';
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

console.log(jadeParser.parser.parse('def x(cb) { cb(); } x!(); console.log(1);'));
var program = jadeParser.parseResult;
console.log(handle(program) + handleAsyncWrapping());
