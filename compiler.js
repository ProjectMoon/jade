var jadeparser = require('./jadeparser');
var ASTNode = require('./jadeparser').ASTNode;
var ast = require('./ast');

//Stuff to deal with the asynchronous wrapping.
//asyncLevel tells us how many nested levels in we are.
//currAsyncCode is the generated callback text, used to check for
//variable assignment.
var asyncLevel = 0;
var currAsyncCode = '';

//ends the current async wrapping and resets it.
//called at the end of blocks or when forced by -- operator.
var endAsyncWrapping = module.exports.endAsyncWrapping = function endAsyncWrapping() {
	var wrapping = '';
	for (var c = asyncLevel; c > 0; c--) {
		wrapping += '});';
	}
	
	asyncLevel = 0;
	currAsyncCode = '';
	return wrapping;
}

/**** Define how to handle the AST ****/
var ASTParser = null; //set at the end, because of circular dependency.

/**** This is where compilation takes place ****/

var handle = module.exports.handle = function handle(node, listSeparator, removeLast) {
	//handling an individual node of the AST tree.
	if (node instanceof ASTNode) {
		var code = '';
		var handler = ASTParser[node.root];
		
		if (typeof handler !== 'undefined') {
			if (node.left != null && node.left.hasOwnProperty('root')) {
				node.left = handle(node.left);
			}

			if (node.right != null && node.right.hasOwnProperty('root')) {
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
		var sep = listSeparator || ';';
		var remLast = removeLast || false;
		var code = '';
		node.forEach(function(entry) {
			code += handle(entry) + sep;
		});
		
		if (remLast) {
			code = code.substring(0, code.length - 1);
		}
		return code;
	}
	else {
		console.log('nothing found to handle ' + JSON.stringify(node));
	}
}

module.exports.compile = function(text) {
	ASTParser = ast.getAST(); //set here because of circular dependency
	jadeparser.parser.parse(text);
	var program = jadeparser.parseResult;
	console.log(JSON.stringify(program, null, 2));
	return handle(program) + endAsyncWrapping();
}

