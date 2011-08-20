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

\s+                   /* skip whitespace */

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

"++"		return 'PLUSPLUS' /* 2- and 3-character operators */
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

"==="		return 'STREQ'
"!=="		return 'STRNEQ'

"^"			return '^' /* bitwise operators */
"^="		return 'XOREQUAL'
"&"			return '&'
"&="		return 'ANDEQUAL'
"|"			return '|'
"|="		return 'OREQUAL'
"<<"		return 'LSHIFT'
"<<="		return 'LSHIFTEQUAL'
">>"		return 'RSHIFT'
">>="		return 'RSHIFTEQUAL'
">>>"		return 'URSHIFT'
">>>="		return 'URSHIFTEQUAL'

\".*\"		return 'STRING' /* regex stuff: idents, strings, etc */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z_]+([0-9a-zA-Z_])*	return 'IDENT'

/lex

/*
The actual grammar. NoBF = No Brace or Function
*/

%start Program

%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

Literal
    :	NULLTOKEN { $$ = 'null'; }
    |	TRUETOKEN { $$ = 'true'; }
    |	FALSETOKEN { $$ = 'false'; }
    |	NUMBER { $$ = Number($1); }
    |	STRING { $$ = yytext; }
    |	'/' { $$ = '/' }
    |	DIVEQUAL { $$ = '/='; }
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
			$$ = 'this';
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
		|
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
			$$ = new ASTNode('Call', $1, $3);
		}
    |	CallExpr Arguments {
			/* x()() */
			$$ = new ASTNode('Call', $1, $3);
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
			$$ = new ASTNode('Call', $1, $3);
		}
    |	CallExprNoBF Arguments {
			/* x()() */
			$$ = new ASTNode('Call', $1, $3);
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
			$$ = New ASTNode('++', null, $1);
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
    : RelationalExprNoIn
    | EqualityExprNoIn EQEQ RelationalExprNoIn
    | EqualityExprNoIn NE RelationalExprNoIn
    | EqualityExprNoIn STREQ RelationalExprNoIn
    | EqualityExprNoIn STRNEQ RelationalExprNoIn
    ;

EqualityExprNoBF
    : RelationalExprNoBF
    | EqualityExprNoBF EQEQ RelationalExpr
    | EqualityExprNoBF NE RelationalExpr
    | EqualityExprNoBF STREQ RelationalExpr
    | EqualityExprNoBF STRNEQ RelationalExpr
    ;

BitwiseANDExpr
    : EqualityExpr
    | BitwiseANDExpr '&' EqualityExpr
    ;

BitwiseANDExprNoIn
    : EqualityExprNoIn
    | BitwiseANDExprNoIn '&' EqualityExprNoIn
    ;

BitwiseANDExprNoBF
    : EqualityExprNoBF
    | BitwiseANDExprNoBF '&' EqualityExpr
    ;

BitwiseXORExpr
    : BitwiseANDExpr
    | BitwiseXORExpr '^' BitwiseANDExpr
    ;

BitwiseXORExprNoIn
    : BitwiseANDExprNoIn
    | BitwiseXORExprNoIn '^' BitwiseANDExprNoIn
    ;

BitwiseXORExprNoBF
    : BitwiseANDExprNoBF
    | BitwiseXORExprNoBF '^' BitwiseANDExpr
    ;

BitwiseORExpr
    : BitwiseXORExpr
    | BitwiseORExpr '|' BitwiseXORExpr
    ;

BitwiseORExprNoIn
    : BitwiseXORExprNoIn
    | BitwiseORExprNoIn '|' BitwiseXORExprNoIn
    ;

BitwiseORExprNoBF
    : BitwiseXORExprNoBF
    | BitwiseORExprNoBF '|' BitwiseXORExpr
    ;

LogicalANDExpr
    : BitwiseORExpr
    | LogicalANDExpr AND BitwiseORExpr
    ;

LogicalANDExprNoIn
    : BitwiseORExprNoIn
    | LogicalANDExprNoIn AND BitwiseORExprNoIn
    ;

LogicalANDExprNoBF
    : BitwiseORExprNoBF
    | LogicalANDExprNoBF AND BitwiseORExpr
    ;

LogicalORExpr
    : LogicalANDExpr
    | LogicalORExpr OR LogicalANDExpr
    ;

LogicalORExprNoIn
    : LogicalANDExprNoIn
    | LogicalORExprNoIn OR LogicalANDExprNoIn
    ;

LogicalORExprNoBF
    : LogicalANDExprNoBF
    | LogicalORExprNoBF OR LogicalANDExpr
    ;

ConditionalExpr
    : LogicalORExpr
    | LogicalORExpr '?' AssignmentExpr ':' AssignmentExpr
    ;

ConditionalExprNoIn
    : LogicalORExprNoIn
    | LogicalORExprNoIn '?' AssignmentExprNoIn ':' AssignmentExprNoIn
    ;

ConditionalExprNoBF
    : LogicalORExprNoBF
    | LogicalORExprNoBF '?' AssignmentExpr ':' AssignmentExpr
    ;

AssignmentExpr
    : ConditionalExpr
    | LeftHandSideExpr AssignmentOperator AssignmentExpr
    ;

AssignmentExprNoIn
    : ConditionalExprNoIn
    | LeftHandSideExpr AssignmentOperator AssignmentExprNoIn
    ;

AssignmentExprNoBF
    : ConditionalExprNoBF
    | LeftHandSideExprNoBF AssignmentOperator AssignmentExpr
    ;

AssignmentOperator
    : '='
    | PLUSEQUAL
    | MINUSEQUAL
    | MULTEQUAL
    | DIVEQUAL
    | LSHIFTEQUAL
    | RSHIFTEQUAL
    | URSHIFTEQUAL
    | ANDEQUAL
    | XOREQUAL
    | OREQUAL
    | MODEQUAL
    ;

Expr
    : AssignmentExpr
    | Expr ',' AssignmentExpr
    ;

ExprNoIn
    : AssignmentExprNoIn
    | ExprNoIn ',' AssignmentExprNoIn
    ;

ExprNoBF
    : AssignmentExprNoBF
    | ExprNoBF ',' AssignmentExpr
    ;

Statement
    : Block
    | VariableStatement
    | ConstStatement
    | FunctionDeclaration
    | EmptyStatement
    | ExprStatement
    | IfStatement
    | IterationStatement
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | WithStatement
    | SwitchStatement
    | LabelledStatement
    | ThrowStatement
    | TryStatement
    | DebuggerStatement
    ;

Block
    : OPENBRACE CLOSEBRACE
    | OPENBRACE SourceElements CLOSEBRACE
    ;

VariableStatement
    : VAR VariableDeclarationList ';'
    | VAR VariableDeclarationList error
    ;

VariableDeclarationList
    : IDENT
    | IDENT Initializer
    | VariableDeclarationList ',' IDENT
    | VariableDeclarationList ',' IDENT Initializer
    ;

VariableDeclarationListNoIn
    : IDENT
    | IDENT InitializerNoIn
    | VariableDeclarationListNoIn ',' IDENT
    | VariableDeclarationListNoIn ',' IDENT InitializerNoIn
    ;

ConstStatement
    : CONSTTOKEN ConstDeclarationList ';'
    | CONSTTOKEN ConstDeclarationList error
    ;

ConstDeclarationList
    : ConstDeclaration
    | ConstDeclarationList ',' ConstDeclaration
    ;

ConstDeclaration
    : IDENT
    | IDENT Initializer
    ;

Initializer
    : '=' AssignmentExpr
    ;

InitializerNoIn
    : '=' AssignmentExprNoIn
    ;

EmptyStatement
    : ';'
    ;

ExprStatement
    : ExprNoBF ';'
    | ExprNoBF error
    ;

IfStatement
    : IF '(' Expr ')' Statement %prec IF_WITHOUT_ELSE
    | IF '(' Expr ')' Statement ELSE Statement
    ;

IterationStatement
    : DO Statement WHILE '(' Expr ')' ';'
    | DO Statement WHILE '(' Expr ')' error
    | WHILE '(' Expr ')' Statement
    | FOR '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' VAR VariableDeclarationListNoIn ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT INTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT InitializerNoIn INTOKEN Expr ')' Statement
    ;

ExprOpt
    : 
    | Expr
    ;

ExprNoInOpt
    : 
    | ExprNoIn
    ;

ContinueStatement
    : CONTINUE ';'
    | CONTINUE error
    | CONTINUE IDENT ';'
    | CONTINUE IDENT error
    ;

BreakStatement
    : BREAK ';'
    | BREAK error
    | BREAK IDENT ';'
    | BREAK IDENT error
    ;

ReturnStatement
    : RETURN ';'
    | RETURN error
    | RETURN Expr ';'
    | RETURN Expr error
    ;

WithStatement
    : WITH '(' Expr ')' Statement
    ;

SwitchStatement
    : SWITCH '(' Expr ')' CaseBlock
    ;

CaseBlock
    : OPENBRACE CaseClausesOpt CLOSEBRACE
    | OPENBRACE CaseClausesOpt DefaultClause CaseClausesOpt CLOSEBRACE
    ;

CaseClausesOpt
    : 
    | CaseClauses
    ;

CaseClauses
    : CaseClause
    | CaseClauses CaseClause
    ;

CaseClause
    : CASE Expr ':'
    | CASE Expr ':' SourceElements
    ;

DefaultClause
    : DEFAULT ':'
    | DEFAULT ':' SourceElements
    ;

LabelledStatement
    : IDENT ':' Statement
    ;

ThrowStatement
    : THROW Expr ';'
    | THROW Expr error
    ;

TryStatement
    : TRY Block FINALLY Block
    | TRY Block CATCH '(' IDENT ')' Block
    | TRY Block CATCH '(' IDENT ')' Block FINALLY Block
    ;

DebuggerStatement
    : DEBUGGER ';'
    | DEBUGGER error
    ;

FunctionDeclaration
    : FUNCTION IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE
    | FUNCTION IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE
    ;

FunctionExpr
    : FUNCTION '(' ')' OPENBRACE FunctionBody CLOSEBRACE
    | FUNCTION '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE
    | FUNCTION IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE
    ;

FormalParameterList
    : IDENT
    | FormalParameterList ',' IDENT
    ;

FunctionBody
    : 
    | SourceElements
    ;

/* Start rule */
Program
    : 
    | SourceElements
    ;

SourceElements
    : Statement
    | SourceElements Statement
    ;

