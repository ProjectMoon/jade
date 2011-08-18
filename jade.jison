/* code for maintaining state and stuff to construct an AST */
%{
	function IfBlock(expr, block) {
		this.expr = expr;
		this.block = block;
	}
	
	function FunctionDeclaration(ident, code) {
		this.ident = ident;
		this.code = code;
	}
	
	function ASTNode(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'

";"		return ';'
"."		return '.'
"["		return '['
"]"		return ']'
"{"		return '{'
"}"		return '}'
"def"	return 'DEF'
"if"	return 'IF'
[a-zA-Z_]+([0-9a-zA-Z_])*	return 'IDENT'


<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start program

%% /* language grammar */

program
    :	block_list EOF {
			console.log(JSON.stringify($1, null, 2));
		}
    |	statement_list EOF {
			console.log(JSON.stringify($1, null, 2));
		}
    ;

statement
	:	expression_statement {
			$$ = $1;
		}
	|	function_declaration {
			$$ = $1;
		}
	|	if_statement {
			$$ = $1;
		}
	;
	
statement_list
	:	statement {
			$$ = [ $1 ];
		}
	|	statement_list statement {
			if ($1 instanceof Array) {
				$1.push($2);
				$$ = $1;
			}
			else {
				$$ = [ $1, $2 ];
			}
		}
	;

block
	:	'{' statement_list '}' {
			$$ = $2;
		}
	;
	
block_list
	:	block { $$ = [ $1 ]; }
	|	block_list block {
			if ($1 instanceof Array) {
				$1.push($2);
				$$ = $1;
			}
			else {
				$$ = [ $1, $2 ];
			}
		}
	;
	
if_statement
	:	IF '(' e ')' block {
			$$ = new ASTNode('If', $3, $5);
		}
	;

function_declaration
	:	DEF IDENT '(' ')' '{' function_body '}' {
			$$ = new ASTNode('FunctionDef', $2, $6);
		}
	;
	
function_body
	:	statement_list
	|	block
	;
	
expression_statement
	:	e ';' { $$ = $1; }
	|	';' { $$ = undefined; }
	;

e
    :	e '+' e {
			$$ = new ASTNode('+', $1, $3);
		}
    |	e '-' e {
			$$ = new ASTNode('-', $1, $3);
		}
    |	e '*' e {
			$$ = new ASTNode('*', $1, $3);
		}
    |	e '/' e {
			$$ = new ASTNode('/', $1, $3);
		}
    |	e '^' e {
			$$ = new ASTNode('^', $1, $3);
		}
    |	'-' e %prec UMINUS {
			$$ = new ASTNode('*', -1, $2);
		}
	|	postfix_expression
    ;
    
postfix_expression
	:	atom { $$ = $1; }
	|	postfix_expression '.' IDENT { $$ = new ASTNode('Property', $1, $3); }
	|	postfix_expression '[' e ']' { $$ = new ASTNode('Array', $1, $3); }
	|	postfix_expression '(' ')' { $$ = new ASTNode('FunctionCall', $1, null); }
	;

atom
	:	NUMBER {
			$$ = Number($1);
		}
	|	IDENT {
			$$ = $1;
		}
	|	'(' e ')' { $$ = $2; }
	;
