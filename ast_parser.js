var jadeParser = require('./jade-parser');
var ASTNode = require('./jade-parser').ASTNode;

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
		
		return 'var ' + left + '=function(' + formalParams + '){' + body + '}';
	},
	
	"FunctionCall": function(left, right) {
		if (right != null) {
			return left + '(' + right + ')';
		}
		else {
			return left + '()';
		}
	},
	
	"If": function(left, right) {
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

console.log(jadeParser.parser.parse('def x(a) { console.log(a); } x(1);'));
var program = jadeParser.parseResult;
console.log(handle(program));
