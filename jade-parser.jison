/* code for maintaining state and stuff to construct an AST */
%{
	var ASTNode = module.exports.ASTNode = function(root, left, right) {
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
\".*\"				  return 'STRING_LITERAL'
\[.+(\,.)*\]			  return 'LIST_LITERAL'

";"		return ';'
"."		return '.'
","		return ','
"["		return '['
"]"		return ']'
"{"		return '{'
"}"		return '}'
"="		return '='
"<"		return '<'
">"		return '>'
":-"	return ':-'
"def"	return 'DEF'
"var"	return 'VAR'
"if"	return 'IF'
"::"	return 'PROTOTYPE'
"return"	return 'RETURN'
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
			module.exports.parseResult = $1;
		}
    |	statement_list EOF {
			module.exports.parseResult = $1;
		}
    ;

statement
	:	expression_statement {
			$$ = $1;
		}
	|	init_variable {
			$$ = $1;
		}
	|	assign_variable {
			$$ = $1;
		}
	|	function_declaration {
			$$ = $1;
		}
	|	if_statement {
			$$ = $1;
		}
	|	end_async_statement
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

end_async_statement
	:	':-' {
			$$ = new ASTNode('EndAsync', null, null);
		}
	;

return_statement
	:	RETURN expression_statement {
			$$ = new ASTNode('Return', $2, null);
		}
	|	RETURN {
			$$ = new ASTNode('Return', null, null);
		}
	|	RETURN '!' expression_list ';' {
			$$ = new ASTNode('AsyncReturn', { values: $3 }, null);
		}		
	|	RETURN '!' {
			$$ = new ASTNode('AsyncReturn', { values: null }, null);
		}
	;
	
init_variable
	:	VAR ident_list '=' expression_statement {
			$$ = new ASTNode('InitVariable', { idents: $2 }, $4);
		}
	;
	
assign_variable
	:	IDENT '=' expression_statement {
			$$ = new ASTNode('AssignVariable', { idents: [ $1 ] }, $3);
		}
	|	'<' ident_list '>' '=' expression_statement {
			$$ = new ASTNode('AssignVariable', { idents: $2 }, $5);
		}
	;

ident_list
	:	IDENT { $$ = [ $1 ]; }
	|	ident_list ',' IDENT {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
	;

function_declaration
	:	DEF IDENT '(' ')' '{' function_body '}' {
			var funcInfo = { formalParams: null, body: $6 };
			$$ = new ASTNode('FunctionDef', $2, funcInfo);
		}
	|	DEF IDENT '(' function_formal_parameters ')' '{' function_body '}' {
			var funcInfo = { formalParams: $4, body: $7 };
			$$ = new ASTNode('FunctionDef', $2, funcInfo);
		}
	|	DEF IDENT '!' '(' ')' '{' function_body '}' {
			var funcInfo = { formalParams: null, body: $7 };
			$$ = new ASTNode('AsyncFunctionDef', $2, funcInfo);
		}
	|	DEF IDENT '!' '(' function_formal_parameters ')' '{' function_body '}' {
			var funcInfo = { formalParams: $5, body: $8 };
			$$ = new ASTNode('AsyncFunctionDef', $2, funcInfo);
		}
	;

function_formal_parameters
	:	IDENT { $$ = $1; }
	|	function_formal_parameters ',' IDENT { $$ = $1 + ',' + $3; }
	;
	
function_body
	:	statement_list
	|	block
	|	return_statement { $$ = $1; }
	;

expression_list
	:	e {
			$$ = [ $1 ];
		}
	|	expression_list ',' e {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
	;
	
expression_statement
	:	e ';' { 
			$$ = new ASTNode('Expression', $1, null);
		}
	|	';' { $$ = new ASTNode('Expression', null, null); }
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
	|	postfix_expression PROTOTYPE IDENT { $$ = new ASTNode('Prototype', $1, $3); }
	|	postfix_expression '[' e ']' { $$ = new ASTNode('Array', $1, $3); }
	|	postfix_expression '(' ')' {
			$$ = new ASTNode('FunctionCall', $1, null);
		}
	|	postfix_expression '(' function_call_parameters ')' {
			$$ = new ASTNode('FunctionCall', $1, $3);
		}
	|	postfix_expression '!' '(' ')' {
			$$ = new ASTNode('AsyncCall', $1, null);
		}
	|	postfix_expression '!' '(' function_call_parameters ')' {
			$$ = new ASTNode('AsyncCall', $1, $3);
		}
	;

function_call_parameters
	:	e { $$ = $1 }
	|	e ',' function_call_parameters { $$ = $1 + ',' + $3; }
	;

atom
	:	NUMBER {
			$$ = Number($1);
		}
	|	IDENT {
			$$ = $1;
		}
	|	STRING_LITERAL {
			$$ = yytext;
		}
	|	LIST_LITERAL {
			$$ = yytext;
		}
	|	'(' e ')' { $$ = $2; }
	;
