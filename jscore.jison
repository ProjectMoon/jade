/*
References:
http://www.opensource.apple.com/source/JavaScriptCore/JavaScriptCore-6531.21.9/parser/Grammar.y
http://www.opensource.apple.com/source/JavaScriptCore/JavaScriptCore-6531.21.9/parser/Keywords.table
http://www.opensource.apple.com/source/JavaScriptCore/JavaScriptCore-6531.21.9/parser/Lexer.cpp
*/

/* code for maintaining state and stuff to construct an AST */
%{
	var ASTNode = module.exports.ASTNode = function(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}
%}

/*
Lexer defintion, gleaned from Keywords.table and Lexer.cpp
*/

%lex
%%

"#".*				/* skip comments */
\s+                   /* skip whitespace */

"break"		return 'BREAK' /* keywords */
"case"		return 'CASE'
"catch"		return 'CATCH'
"const"		return 'CONSTTOKEN'
"default"	return 'DEFAULT'
"finally"	return 'FINALLY'
"for"		return 'FOR'
"instanceof" return 'INSTANCEOF'
"new"		return 'NEW'
"var"		return 'VAR'
"continue"	return 'CONTINUE'
"function"	return 'FUNCTION'
"return"	return 'RETURN'
"void"		return 'VOIDTOKEN'
"delete"	return 'DELETETOKEN'
"if"		return 'IF'
"this"		return 'THISTOKEN'
"do"		return 'DO'
"while"		return 'WHILE'
"else"		return 'ELSE'
"in"		return 'INTOKEN'
"switch"	return 'SWITCH'
"throw"		return 'THROW'
"try"		return 'TRY'
"typeof"	return 'TYPEOF'
"with"		return 'WITH'
"debugger"	return 'DEBUGGER'

"class"		return 'RESERVED' /* reserved words */
"enum"		return 'RESERVED'
"export"	return 'RESERVED'
"extends"	return 'RESERVED'
"import"	return 'RESERVED'
"super"		return 'RESERVED'

[a-zA-Z_]+([0-9a-zA-Z_])*	return 'IDENT'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
\".*\"		return 'STRING' /* regex stuff: idents, strings, etc */
\'.*\'		return 'STRING'

">>="		return 'RSHIFTEQUAL'
">>>"		return 'URSHIFT'
">>>="		return 'URSHIFTEQUAL'
"<<="		return 'LSHIFTEQUAL'
"==="		return 'STREQ'
"!=="		return 'STRNEQ'

"<<"		return 'LSHIFT'
">>"		return 'RSHIFT'
"|="		return 'OREQUAL'
"&="		return 'ANDEQUAL'
"^="		return 'XOREQUAL'
"++"		return 'PLUSPLUS'
"--"		return 'MINUSMINUS'
"=="		return 'EQEQ'
"!="		return 'NE'
">="		return 'GE'
"<="		return 'LE'
"&&"		return 'AND'
"||"		return 'OR'
"+="		return 'PLUSEQUAL'
"-="		return 'MINUSEQUAL'
"*="		return 'MULTEQUAL'
"/="		return 'DIVEQUAL'
"%="		return 'MODEQUAL'


"="			return '=' /* operators */
"/"			return '/'
"*"			return '*'
"/"			return '/'
"-"			return '-'
"+"			return '+'
"!"			return '!'
"%"			return '%'
"~"			return "~"
">"			return '>'
"<"			return '<'
"^"			return '^' /* bitwise operators */
"&"			return '&'
"|"			return '|'

"{"			return 'OPENBRACE' /* single characters */
"}"			return 'CLOSEBRACE'
"("			return '('
")"			return ')'
"["			return '['
"]"			return ']'
","			return ','
"?"			return '?'
":"			return ':'
";"			return ';'
"."			return '.'
\"			return '"'
"'"			return '\''

/lex

/*
The actual grammar. NoBF = No Brace or Function
*/

%start Program

%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

Literal
    :	NULLTOKEN { $$ = new ASTNode('DirectCopy', 'null', null); }
    |	TRUETOKEN { $$ = new ASTNode('DirectCopy', 'true', null); }
    |	FALSETOKEN { $$ = new ASTNode('DirectCopy', 'false', null); }
    |	NUMBER { $$ = new ASTNode('DirectCopy', $1, null); }
    |	STRING { $$ = new ASTNode('DirectCopy', yytext, null); }
    |	'/' { $$ = new ASTNode('DirectCopy', '/', null); }
    |	DIVEQUAL { $$ = new ASTNode('DirectCopy', '/=', null); }
    ;

/* JSON/javascript object literals */
Property
    :	IDENT ':' AssignmentExpr {
			$$ = new ASTNode('JSONProperty', $1, $3);
		}
	|	STRING ':' AssignmentExpr {
			$$ = new ASTNode('JSONProperty', $1, $3);
		}
    |	NUMBER ':' AssignmentExpr {
			$$ = new ASTNode('JSONNumberProperty', $1, $3);
			
		}
    |	IDENT IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE {
			console.log('ident ident () { body }');
		}
	|	IDENT IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE {
			console.log('ident ident (params) { body }');
		}
    ;

/* JSON/javascript object literals */
PropertyList
    :	Property {
			$$ = [ $1 ];
		}
    |	PropertyList ',' Property {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    ;

/* JSON/javascript object literals, or other stuff */
PrimaryExpr
    :	PrimaryExprNoBrace
    |	OPENBRACE CLOSEBRACE {
			$$ = new ASTNode('DirectCopy', '{}', null);
		}
    |	OPENBRACE PropertyList CLOSEBRACE {
			$$ = new ASTNode('JSON', $2, null);
		}
    |	OPENBRACE PropertyList ',' CLOSEBRACE {
			$$ = new ASTNode('JSON', $2, null);
		}
    ;

PrimaryExprNoBrace
    :	THISTOKEN {
			$$ = new ASTNode('DirectCopy', 'this', null);
		}
    |	Literal
    |	ArrayLiteral
    |	IDENT
    |	'(' Expr ')' {
			$$ = $2;
		}
    ;

/* Array literals */
/* ElisionOpt is blank entries. ignore them */
/* i.e. [,,,] becomes [] */
ArrayLiteral
    :	'[' ElisionOpt ']' {
			$$ = [];
		}
	|	'[' ElementList ']' {
			if ($2 instanceof Array) {
				$$ = $2;
			}
			else {
				$$ = [ $2 ];
			}
		}
    |	'[' ElementList ',' ElisionOpt ']' {
			if ($2 instanceof Array) {
				$$ = $2;
			}
			else {
				$$ = [ $2 ];
			}
		}
    ;

/* Array literals */
ElementList
    :	ElisionOpt AssignmentExpr {
			$$ = [ $2 ];
		}
    |	ElementList ',' ElisionOpt AssignmentExpr {
			if ($1 instanceof Array) {
				$1.push($4);
				$$ = $1;
			}
		}
    ;

/* Array literals */
ElisionOpt
    : 
    |	Elision { $$ = ''; }
    ;

/* Array literals */
Elision
    :	',' { $$ = ''; }
    |	Elision ','  { $$ = ''; }
    ;

MemberExpr
    :	PrimaryExpr
    |	FunctionExpr
    |	MemberExpr '[' Expr ']' {
			$$ = new ASTNode('ArrayProperty', $1, $3);
		}
    |	MemberExpr '.' IDENT {
			$$ = new ASTNode('Property', $1, $3);
		}
    |	NEW MemberExpr Arguments {
			$$ = new ASTNode('New', $1, $3);
		}
    ;

MemberExprNoBF
    :	PrimaryExprNoBrace
    |	MemberExprNoBF '[' Expr ']' {
			$$ = new ASTNode('ArrayProperty', $1, $3);
		}
    |	MemberExprNoBF '.' IDENT {
			$$ = new ASTNode('Property', $1, $3);
		}
    |	NEW MemberExpr Arguments {
			$$ = new ASTNode('New', $1, $3);
		}
    ;

/* used on lefthand side */
NewExpr
    :	MemberExpr
    |	NEW NewExpr {
			$$ = new ASTNode('New', $2, null);
		}
    ;

NewExprNoBF
    :	MemberExprNoBF
    |	NEW NewExpr {
			$$ = new ASTNode('New', $2, null);
		}
    ;

CallExpr
    :	MemberExpr Arguments {
			/* x() */
			$$ = new ASTNode('Call', $1, $2);
		}
    |	CallExpr Arguments {
			/* x()() */
			$$ = new ASTNode('Call', $1, $2);
		}
    |	CallExpr '[' Expr ']' {
			/* x()[y] */
			$$ = new ASTNode('ArrayProperty', $1, $3);
		}
    |	CallExpr '.' IDENT {
			/* x().y */
			$$ = new ASTNode('Property', $1, $3);
		}
    ;

CallExprNoBF
    :	MemberExprNoBF Arguments {
			/* x() */
			$$ = new ASTNode('Call', $1, $2);
		}
    |	CallExprNoBF Arguments {
			/* x()() */
			$$ = new ASTNode('Call', $1, $2);
		}
    |	CallExprNoBF '[' Expr ']' {
			/* x()[y] */
			$$ = new ASTNode('ArrayProperty', $1, $3);
		}
    |	CallExprNoBF '.' IDENT {
			$$ = new ASTNode('Property', $1, $3);
		}
    ;

Arguments
    :	'(' ')' {
			$$ = new ASTNode('Arguments', null, null);
		}
    |	'(' ArgumentList ')' {
			$$ = new ASTNode('Arguments', $2, null);
		}
    ;

ArgumentList
    :	AssignmentExpr {
			$$ = [ $1 ];
		}
    |	ArgumentList ',' AssignmentExpr {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    ;

LeftHandSideExpr
    :	NewExpr
    |	CallExpr
    ;

LeftHandSideExprNoBF
    :	NewExprNoBF
    |	CallExprNoBF
    ;

/* These ASTNodes have null left and filled right because they are post */
PostfixExpr
    :	LeftHandSideExpr
    |	LeftHandSideExpr PLUSPLUS {
			$$ = new ASTNode('++', null, $1);
		}
    |	LeftHandSideExpr MINUSMINUS {
			$$ = new ASTNode('--', null, $1);
		}
    ;

/* These ASTNodes have null left and filled right because they are post */
PostfixExprNoBF
    :	LeftHandSideExprNoBF
    |	LeftHandSideExprNoBF PLUSPLUS {
			$$ = new ASTNode('++', $1, null);
		}
    |	LeftHandSideExprNoBF MINUSMINUS {
			$$ = new ASTNode('--', $1, null);
		}
    ;

UnaryExprCommon
    :	DELETETOKEN UnaryExpr {
			$$ = new ASTNode('Delete', $1, null);
		}
    |	VOIDTOKEN UnaryExpr {
			$$ = new ASTNode('Void', $1, null);
		}
    |	TYPEOF UnaryExpr {
			$$ = new ASTNode('Typeof', $1, null);
		}
    |	PLUSPLUS UnaryExpr {
			/* filled left and null right because it's pre */
			$$ = new ASTNode('++', $2, null);
		}
    //| AUTOPLUSPLUS UnaryExpr
    |	MINUSMINUS UnaryExpr {
			/* filled left and null right because it's pre */
			$$ = new ASTNode('--', $2, null);
		}
    //| AUTOMINUSMINUS UnaryExpr
    |	'+' UnaryExpr {
			$$ = new ASTNode('+', $2, null);
		}
    |	'-' UnaryExpr {
			$$ = new ASTNode('-', $2, null);
		}
    |	'~' UnaryExpr {
			$$ = new ASTNode('~', $2, null);
		}
    |	'!' UnaryExpr {
			$$ = new ASTNode('!', $2, null);
		}
    ;

UnaryExpr
    :	PostfixExpr
    |	UnaryExprCommon
    ;

UnaryExprNoBF
    :	PostfixExprNoBF
    |	UnaryExprCommon
    ;

MultiplicativeExpr
    :	UnaryExpr
    |	MultiplicativeExpr '*' UnaryExpr {
			$$ = new ASTNode('*', $1, $3);
		}
    |	MultiplicativeExpr '/' UnaryExpr {
			$$ = new ASTNode('/', $1, $3);
		}
    |	MultiplicativeExpr '%' UnaryExpr {
			$$ = new ASTNode('%', $1, $3);
		}
    ;

MultiplicativeExprNoBF
    :	UnaryExprNoBF
    |	MultiplicativeExprNoBF '*' UnaryExpr {
			$$ = new ASTNode('*', $1, $3);
		}
    |	MultiplicativeExprNoBF '/' UnaryExpr {
			$$ = new ASTNode('/', $1, $3);
		}
    |	MultiplicativeExprNoBF '%' UnaryExpr {
			$$ = new ASTNode('%', $1, $3);
		}
    ;

AdditiveExpr
    :	MultiplicativeExpr
    |	AdditiveExpr '+' MultiplicativeExpr {
			$$ = new ASTNode('+', $1, $3);
		}
    |	AdditiveExpr '-' MultiplicativeExpr {
			$$ = new ASTNode('-', $1, $3);
		}
    ;

AdditiveExprNoBF
    :	MultiplicativeExprNoBF
    |	AdditiveExprNoBF '+' MultiplicativeExpr {
			$$ = new ASTNode('+', $1, $3);
		}
    |	AdditiveExprNoBF '-' MultiplicativeExpr {
			$$ = new ASTNode('-', $1, $3);
		}
    ;

ShiftExpr
    :	AdditiveExpr
    |	ShiftExpr LSHIFT AdditiveExpr {
			$$ = new ASTNode('<<', $1, $3);
		}
    |	ShiftExpr RSHIFT AdditiveExpr {
			$$ = new ASTNode('>>', $1, $3);
		}
    |	ShiftExpr URSHIFT AdditiveExpr {
			$$ = new ASTNode('>>>', $1, $3);
		}
    ;

ShiftExprNoBF
    :	AdditiveExprNoBF
    |	ShiftExprNoBF LSHIFT AdditiveExpr {
			$$ = new ASTNode('<<', $1, $3);
		}
    |	ShiftExprNoBF RSHIFT AdditiveExpr {
			$$ = new ASTNode('>>', $1, $3);
		}
    |	ShiftExprNoBF URSHIFT AdditiveExpr {
			$$ = new ASTNode('>>>', $1, $3);
		}
    ;

RelationalExpr
    :	ShiftExpr
    |	RelationalExpr '<' ShiftExpr {
			$$ = new ASTNode('<', $1, $3);
		}
    |	RelationalExpr '>' ShiftExpr {
			$$ = new ASTNode('>', $1, $3);
		}
    |	RelationalExpr LE ShiftExpr {
			$$ = new ASTNode('<=', $1, $3);
		}
    |	RelationalExpr GE ShiftExpr {
			$$ = new ASTNode('>=', $1, $3);
		}
    |	RelationalExpr INSTANCEOF ShiftExpr {
			$$ = new ASTNode('Instanceof', $1, $3);
		}
    |	RelationalExpr INTOKEN ShiftExpr {
			$$ = new ASTNode('In', $1, $3);
		}
    ;

RelationalExprNoIn
    :	ShiftExpr
    |	RelationalExprNoIn '<' ShiftExpr {
			$$ = new ASTNode('<', $1, $3);
		}
    |	RelationalExprNoIn '>' ShiftExpr {
			$$ = new ASTNode('>', $1, $3);
		}
    |	RelationalExprNoIn LE ShiftExpr {
			$$ = new ASTNode('<=', $1, $3);
		}
    |	RelationalExprNoIn GE ShiftExpr {
			$$ = new ASTNode('>=', $1, $3);
		}
    |	RelationalExprNoIn INSTANCEOF ShiftExpr {
			$$ = new ASTNode('Instanceof', $1, $3);
		}
    ;

RelationalExprNoBF
    :	ShiftExprNoBF
    |	RelationalExprNoBF '<' ShiftExpr {
			$$ = new ASTNode('<', $1, $3);
		}
    |	RelationalExprNoBF '>' ShiftExpr {
			$$ = new ASTNode('>', $1, $3);
		}
    |	RelationalExprNoBF LE ShiftExpr {
			$$ = new ASTNode('<=', $1, $3);
		}
    |	RelationalExprNoBF GE ShiftExpr {
			$$ = new ASTNode('>=', $1, $3);
		}
    |	RelationalExprNoBF INSTANCEOF ShiftExpr {
			$$ = new ASTNode('Instanceof', $1, $3);
		}
    |	RelationalExprNoBF INTOKEN ShiftExpr {
			$$ = new ASTNode('In', $1, $3);
		}
    ;

EqualityExpr
    :	RelationalExpr
    |	EqualityExpr EQEQ RelationalExpr {
			$$ = new ASTNode('==', $1, $3);
		}
    |	EqualityExpr NE RelationalExpr {
			$$ = new ASTNode('!=', $1, $3);
		}
    |	EqualityExpr STREQ RelationalExpr {
			$$ = new ASTNode('===', $1, $3);
		}
    |	EqualityExpr STRNEQ RelationalExpr {
			$$ = new ASTNode('!==', $1, $3);
		}
    ;

EqualityExprNoIn
    :	RelationalExprNoIn
    |	EqualityExprNoIn EQEQ RelationalExprNoIn {
			$$ = new ASTNode('==', $1, $3);
		}
    |	EqualityExprNoIn NE RelationalExprNoIn {
			$$ = new ASTNode('!=', $1, $3);
		}
    |	EqualityExprNoIn STREQ RelationalExprNoIn {
			$$ = new ASTNode('===', $1, $3);
		}
    |	EqualityExprNoIn STRNEQ RelationalExprNoIn {
			$$ = new ASTNode('!==', $1, $3);
		}
    ;

EqualityExprNoBF
    :	RelationalExprNoBF
    |	EqualityExprNoBF EQEQ RelationalExpr {
			$$ = new ASTNode('==', $1, $3);
		}
    |	EqualityExprNoBF NE RelationalExpr {
			$$ = new ASTNode('!=', $1, $3);
		}
    |	EqualityExprNoBF STREQ RelationalExpr {
			$$ = new ASTNode('===', $1, $3);
		}
    |	EqualityExprNoBF STRNEQ RelationalExpr {
			$$ = new ASTNode('!==', $1, $3);
		}
    ;

BitwiseANDExpr
    :	EqualityExpr
    |	BitwiseANDExpr '&' EqualityExpr {
			$$ = new ASTNode('&', $1, $3);
		}
    ;

BitwiseANDExprNoIn
    :	EqualityExprNoIn
    |	BitwiseANDExprNoIn '&' EqualityExprNoIn {
			$$ = new ASTNode('&', $1, $3);
		}
    ;

BitwiseANDExprNoBF
    :	EqualityExprNoBF
    |	BitwiseANDExprNoBF '&' EqualityExpr {
			$$ = new ASTNode('&', $1, $3);
		}
    ;

BitwiseXORExpr
    :	BitwiseANDExpr
    |	BitwiseXORExpr '^' BitwiseANDExpr {
			$$ = new ASTNode('^', $1, $3);
		}
    ;

BitwiseXORExprNoIn
    :	BitwiseANDExprNoIn
    |	BitwiseXORExprNoIn '^' BitwiseANDExprNoIn {
			$$ = new ASTNode('^', $1, $3);
		}
    ;

BitwiseXORExprNoBF
    :	BitwiseANDExprNoBF
    |	BitwiseXORExprNoBF '^' BitwiseANDExpr {
			$$ = new ASTNode('^', $1, $3);
		}
    ;

BitwiseORExpr
    :	BitwiseXORExpr
    |	BitwiseORExpr '|' BitwiseXORExpr {
			$$ = new ASTNode('|', $1, $3);
		}
    ;

BitwiseORExprNoIn
    :	BitwiseXORExprNoIn
    |	BitwiseORExprNoIn '|' BitwiseXORExprNoIn {
			$$ = new ASTNode('|', $1, $3);
		}
    ;

BitwiseORExprNoBF
    :	BitwiseXORExprNoBF
    |	BitwiseORExprNoBF '|' BitwiseXORExpr {
			$$ = new ASTNode('|', $1, $3);
		}
    ;

LogicalANDExpr
    :	BitwiseORExpr
    |	LogicalANDExpr AND BitwiseORExpr {
			$$ = new ASTNode('&&', $1, $3);
		}
    ;

LogicalANDExprNoIn
    :	BitwiseORExprNoIn
    |	LogicalANDExprNoIn AND BitwiseORExprNoIn {
			$$ = new ASTNode('&&', $1, $3);
		}
    ;

LogicalANDExprNoBF
    :	BitwiseORExprNoBF
    |	LogicalANDExprNoBF AND BitwiseORExpr {
			$$ = new ASTNode('&&', $1, $3);
		}
    ;

LogicalORExpr
    :	LogicalANDExpr
    |	LogicalORExpr OR LogicalANDExpr {
			$$ = new ASTNode('||', $1, $3);
		}
    ;

LogicalORExprNoIn
    :	LogicalANDExprNoIn
    |	LogicalORExprNoIn OR LogicalANDExprNoIn {
			$$ = new ASTNode('||', $1, $3);
		}
    ;

LogicalORExprNoBF
    :	LogicalANDExprNoBF
    |	LogicalORExprNoBF OR LogicalANDExpr {
			$$ = new ASTNode('||', $1, $3);
		}
    ;

ConditionalExpr
    :	LogicalORExpr
    |	LogicalORExpr '?' AssignmentExpr ':' AssignmentExpr {
			$$ = new ASTNode('?:', $1, { success: $3, failure: $5 });
		}
    ;

ConditionalExprNoIn
    :	LogicalORExprNoIn
    |	LogicalORExprNoIn '?' AssignmentExprNoIn ':' AssignmentExprNoIn {
			$$ = new ASTNode('?:', $1, { success: $3, failure: $5 });
		}
    ;

ConditionalExprNoBF
    :	LogicalORExprNoBF
    |	LogicalORExprNoBF '?' AssignmentExpr ':' AssignmentExpr {
			$$ = new ASTNode('?:', $1, { success: $3, failure: $5 });
		}
    ;

AssignmentExpr
    :	ConditionalExpr
    |	LeftHandSideExpr AssignmentOperator AssignmentExpr {
			$$ = new ASTNode($2, $1, $3);
		}
    ;

AssignmentExprNoIn
    :	ConditionalExprNoIn
    |	LeftHandSideExpr AssignmentOperator AssignmentExprNoIn {
			$$ = new ASTNode($2, $1, $3);
		}
    ;

AssignmentExprNoBF
    :	ConditionalExprNoBF
    |	LeftHandSideExprNoBF AssignmentOperator AssignmentExpr {
			$$ = new ASTNode($2, $1, $3);
		}
    ;

/* take text directly because it's used in AssignmentExpr rules */
AssignmentOperator
    :	'='
    |	PLUSEQUAL
    |	MINUSEQUAL
    |	MULTEQUAL
    |	DIVEQUAL
    |	LSHIFTEQUAL
    |	RSHIFTEQUAL
    |	URSHIFTEQUAL
    |	ANDEQUAL
    |	XOREQUAL
    |	OREQUAL
    |	MODEQUAL
    ;

Expr
    :	AssignmentExpr
    |	Expr ',' AssignmentExpr {
			$$ = new ASTNode(',', $1, $3);
		}
    ;

ExprNoIn
    :	AssignmentExprNoIn
    |	ExprNoIn ',' AssignmentExprNoIn {
			$$= new ASTNode(',', $1, $3);
		}
    ;

ExprNoBF
    :	AssignmentExprNoBF
    |	ExprNoBF ',' AssignmentExpr {
			$$ = new ASTNode(',', $1, $3);
		}
    ;

Statement
    :	Block
    |	VariableStatement
    |	ConstStatement
    |	FunctionDeclaration
    |	EmptyStatement
    |	ExprStatement
    |	IfStatement
    |	IterationStatement
    |	ContinueStatement
    |	BreakStatement
    |	ReturnStatement
    |	WithStatement
    |	SwitchStatement
    |	LabelledStatement
    |	ThrowStatement
    |	TryStatement
    |	DebuggerStatement
    ;

Block
    :	OPENBRACE CLOSEBRACE {
			$$ = new ASTNode('Block', null, null);
		}
    |	OPENBRACE SourceElements CLOSEBRACE {
			$$ = new ASTNode('Block', $2, null);
		}
    ;

VariableStatement
    :	VAR VariableDeclarationList ';' {
			$$ = new ASTNode('VariableDeclaration', $2, null);
		}
    |	VAR VariableDeclarationList error {
			console.log('error at variable statement');
		}
    ;

VariableDeclarationList
    :	IDENT {
			$$ = [ $1 ];
		}
    |	IDENT Initializer {
			$$ = new ASTNode('VariableAssignment', $1, $2);
		}
    |	VariableDeclarationList ',' IDENT {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    |	VariableDeclarationList ',' IDENT Initializer {
			var init = new ASTNode('VariableAssignment', $3, $4);
			if ($1 instanceof Array) {
				$1.push(init);
				$$ = $1;
			}
			else {
				$$ = [ $1, init ];
			}
		}
    ;

VariableDeclarationListNoIn
    :	IDENT {
			$$ = [ $1 ];
		}
    |	IDENT InitializerNoIn {
			$$ = new ASTNode('VariableAssignment', $1, $2);
		}
    |	VariableDeclarationListNoIn ',' IDENT {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    |	VariableDeclarationListNoIn ',' IDENT InitializerNoIn {
			var init = new ASTNode('VariableAssignment', $3, $4);
			if ($1 instanceof Array) {
				$1.push(init);
				$$ = $1;
			}
			else {
				$$ = [ $1, init ];
			}
		}
    ;
    
ConstStatement
    :	CONSTTOKEN ConstDeclarationList ';' {
			$$ = new ASTNode('Const', $2, null);
		}
    |	CONSTTOKEN ConstDeclarationList error {
			console.log('error at const statement');
		}
    ;

ConstDeclarationList
    :	ConstDeclaration {
			$$ = [ $1 ];
		}
    |	ConstDeclarationList ',' ConstDeclaration {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    ;

ConstDeclaration
    :	IDENT
    |	IDENT Initializer {
			$$ = new ASTNode('ConstAssignment', $1, $2);
		}
    ;

Initializer
    :	'=' AssignmentExpr {
			$$ = $2;
		}
    ;

InitializerNoIn
    :	'=' AssignmentExprNoIn {
			$$ = $2;
		}
    ;

EmptyStatement
    :	';' { $$ = ''; }
    ;

ExprStatement
    :	ExprNoBF ';'
    |	ExprNoBF error { console.log('error at ExprNoBF statement.'); }
    ;

IfStatement
    :	IF '(' Expr ')' Statement %prec IF_WITHOUT_ELSE {
			$$ = new ASTNode('If', $3, $5);
		}
    |	IF '(' Expr ')' Statement ELSE Statement {
			$$ = new ASTNode('IfElse', $3, { success: $5, failure: $7 });
		}
    ;

IterationStatement
    :	DO Statement WHILE '(' Expr ')' ';' {
			$$ = new ASTNode('DoWhile', $5, $2);
		}
    |	DO Statement WHILE '(' Expr ')' error {
			console.log('error at do while statement');
		}
    |	WHILE '(' Expr ')' Statement {
			$$ = new ASTNode('While', $3, $5);
		}
    |	FOR '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Statement {
			var forInfo = {
				start: $3,
				end: $5,
				step: $7
			};
			
			$$ = new ASTNode('For', forInfo, $9);
		}
    |	FOR '(' VAR VariableDeclarationListNoIn ';' ExprOpt ';' ExprOpt ')' Statement {
			var forInfo = {
				start: $4,
				end: $6,
				step: $8
			};
			
			$$ = new ASTNode('For', forInfo, $10);
		}
    |	FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement {
			var forInfo = {
				each: $3,
				inExpr: $5
			};
			
			$$ = new ASTNode('ForIn', forInfo, $7);
		}
    |	FOR '(' VAR IDENT INTOKEN Expr ')' Statement {
			var forInfo = {
				each: $4,
				inExpr: $6
			};
			
			$$ = new ASTNode('ForInScoped', forInfo, $8);
		}
    |	FOR '(' VAR IDENT InitializerNoIn INTOKEN Expr ')' Statement {
			var forInfo = {
				each: $4,
				inExpr: $7
			};
			
			$$ = new ASTNode('ForInScoped', forInfo, $9);
		}
    ;

ExprOpt
    : 
    |	Expr
    ;

ExprNoInOpt
    : 
    |	ExprNoIn
    ;

ContinueStatement
    :	CONTINUE ';' {
			$$ = new ASTNode('Continue', null, null);
		}
    |	CONTINUE error {
			console.log('error at continue statement');
		}
    |	CONTINUE IDENT ';' {
			$$ = new ASTNode('Continue', $1, null);
		}
    |	CONTINUE IDENT error {
				console.log('error at continue with ident statement');
		}
    ;

BreakStatement
    :	BREAK ';' {
			$$ = new ASTNode('Break', null, null);
		}
    |	BREAK error {
			console.log('error in identless break');
		}
    |	BREAK IDENT ';' {
			$$ = new ASTNode('Break', $1, null);
		}
    |	BREAK IDENT error {
			console.log('error in ident break');
		}
    ;

ReturnStatement
    :	RETURN ';' {
			$$ = new ASTNode('Return', null, null);
		}
    |	RETURN error {
			console.log('error in expressionless return');
		}
    |	RETURN Expr ';' {
			$$ = new ASTNode('Return', $1, null);
		}
    |	RETURN Expr error {
			console.log('error in expression return');
		}
    ;

WithStatement
    :	WITH '(' Expr ')' Statement {
			$$ = new ASTNode('With', $3, $5);
		}
    ;

SwitchStatement
    :	SWITCH '(' Expr ')' CaseBlock {
			$$ = new ASTNode('Switch', $3, $5);
		}
    ;

CaseBlock
    :	OPENBRACE CaseClausesOpt CLOSEBRACE {
			$$ = new ASTNode('CaseBlock', $2, null);
		}
    |	OPENBRACE CaseClausesOpt DefaultClause CaseClausesOpt CLOSEBRACE {
			var cases = [];
			if ($2 instanceof Array) {
				cases = $2;
				cases.push($3);
				cases = cases.concat($4);
				$$ = new ASTNode('CaseBlock', cases, null);
			}
			else {
				console.log('warning: could not construct case list');
			}
		}
    ;

CaseClausesOpt
    : 
    |	CaseClauses
    ;

CaseClauses
    :	CaseClause {
			$$ = [ $1 ];
		}
    |	CaseClauses CaseClause {
			if ($1 instanceof Array) {
				$1.push($2);
				$$ = $1;
			}
			else {
				$$ = [ $1, $2 ];
			}
		}
    ;

CaseClause
    :	CASE Expr ':' {
			$$ = new ASTNode('Case', $2, null);
		}
    |	CASE Expr ':' SourceElements {
			$$ = new ASTNode('Case', $2, $4);
		}
    ;

DefaultClause
    :	DEFAULT ':' {
			$$ = new ASTNode('Case', 'Default', null);
		}
    |	DEFAULT ':' SourceElements {
			$$ = new ASTNode('Case', 'Default', $4);
		}
    ;

LabelledStatement
    :	IDENT ':' Statement {
			$$ = new ASTNode('Label', $1, $3);
		}
    ;

ThrowStatement
    :	THROW Expr ';' {
			$$ = new ASTNode('Throw', $2, null);
		}
    |	THROW Expr error {
			console.log('error at throw');
		}
    ;

TryStatement
    :	TRY Block FINALLY Block {
			$$ = new ASTNode('TryCatch', { block: $2, finallyBlock: $4 }, null);
		}
    |	TRY Block CATCH '(' IDENT ')' Block {
			var catchInfo = {
				ident: $5,
				block: $7
			};
			$$ = new ASTNode('TryCatch', { block: $2, catchBlock: catchInfo }, null);
		}
    |	TRY Block CATCH '(' IDENT ')' Block FINALLY Block {
			var catchInfo = {
				ident: $5,
				block: $7
			};
			$$ = new ASTNode('TryCatch', { block: $2, catchBlock: catchInfo, finallyBlock: $9 }, null);
		}
    ;

DebuggerStatement
    :	DEBUGGER ';' {
			$$ = new ASTNode('Debugger', null, null);
		}
    |	DEBUGGER error {
			console.log('error at debugger');
		}
    ;

FunctionDeclaration
    :	FUNCTION IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				ident: $2,
				formalParameters: null
			};
			
			$$ = new ASTNode('FunctionDeclaration', funcInfo, $6);
		}
    |	FUNCTION IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				ident: $2,
				formalParameters: $4
			};
			
			$$ = new ASTNode('FunctionDeclaration', funcInfo, $7);
		}
    ;

FunctionExpr
    :	FUNCTION '(' ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				name: null,
				formalParameters: null
			};
			
			$$ = new ASTNode('FunctionExpression', funcInfo, $5);
		}
    |	FUNCTION '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				name: null,
				formalParameters: $3
			};
			
			$$ = new ASTNode('FunctionExpression', funcInfo, $6);
		}
    |	FUNCTION IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				name: $2,
				formalParameters: null
			};
			
			$$ = new ASTNode('FunctionExpression', funcInfo, $6);
		}
    |	FUNCTION IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE {
			var funcInfo = {
				name: $2,
				formalParameters: $4
			};
			
			$$ = new ASTNode('FunctionExpression', funcInfo, $7);
		}
    ;

FormalParameterList
    :	IDENT {
			$$ = [ $1 ];
		}
    |	FormalParameterList ',' IDENT {
			if ($1 instanceof Array) {
				$1.push($3);
				$$ = $1;
			}
			else {
				$$ = [ $1, $3 ];
			}
		}
    ;

FunctionBody
    : 
    |	SourceElements
    ;

/* Start rule */
Program
    : 
    |	SourceElements {
			console.log(JSON.stringify($1, null, 2));
		}
    ;

SourceElements
    :	Statement {
			$$ = [ $1 ];
		}
    |	SourceElements Statement {
			if ($1 instanceof Array) {
				$1.push($2);
				$$ = $1;
			}
			else {
				$$ = [ $1, $2 ];
			}
		}
    ;
