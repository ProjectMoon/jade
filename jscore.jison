%lex
%%

\s+                   /* skip whitespace */
"{"			return 'OPENBRACE'
"}"			return 'CLOSEBRACE'
","			return ','
"?"			return '?'
":"			return ':'
";"			return ';'

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


%start Program

%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%%

Literal
    : NULLTOKEN
    | TRUETOKEN
    | FALSETOKEN
    | NUMBER
    | STRING
    | '/'
    | DIVEQUAL
    ;

Property
    : IDENT ':' AssignmentExpr
    | STRING ':' AssignmentExpr
    | NUMBER ':' AssignmentExpr
    | IDENT IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE
    | IDENT IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE
    ;

PropertyList
    : Property
    | PropertyList ',' Property
    ;

PrimaryExpr
    : PrimaryExprNoBrace
    | OPENBRACE CLOSEBRACE
    | OPENBRACE PropertyList CLOSEBRACE
    | OPENBRACE PropertyList ',' CLOSEBRACE
    ;

PrimaryExprNoBrace
    : THISTOKEN
    | Literal
    | ArrayLiteral
    | IDENT
    | '(' Expr ')'
    ;

ArrayLiteral
    : '[' ElisionOpt ']'
    | '[' ElementList ']'
    | '[' ElementList ',' ElisionOpt ']'
    ;

ElementList
    : ElisionOpt AssignmentExpr
    | ElementList ',' ElisionOpt AssignmentExpr
    ;

ElisionOpt
    : 
    | Elision
    ;

Elision
    : ','
    | Elision ','
    ;

MemberExpr
    : PrimaryExpr
    | FunctionExpr
    | MemberExpr '[' Expr ']'
    | MemberExpr '.' IDENT
    | NEW MemberExpr Arguments
    ;

MemberExprNoBF
    : PrimaryExprNoBrace
    | MemberExprNoBF '[' Expr ']'
    | MemberExprNoBF '.' IDENT
    | NEW MemberExpr Arguments
    ;

NewExpr
    : MemberExpr
    | NEW NewExpr
    ;

NewExprNoBF
    : MemberExprNoBF
    | NEW NewExpr
    ;

CallExpr
    : MemberExpr Arguments
    | CallExpr Arguments
    | CallExpr '[' Expr ']'
    | CallExpr '.' IDENT
    ;

CallExprNoBF
    : MemberExprNoBF Arguments
    | CallExprNoBF Arguments
    | CallExprNoBF '[' Expr ']'
    | CallExprNoBF '.' IDENT
    ;

Arguments
    : '(' ')'
    | '(' ArgumentList ')'
    ;

ArgumentList
    : AssignmentExpr
    | ArgumentList ',' AssignmentExpr
    ;

LeftHandSideExpr
    : NewExpr
    | CallExpr
    ;

LeftHandSideExprNoBF
    : NewExprNoBF
    | CallExprNoBF
    ;

PostfixExpr
    : LeftHandSideExpr
    | LeftHandSideExpr PLUSPLUS
    | LeftHandSideExpr MINUSMINUS
    ;

PostfixExprNoBF
    : LeftHandSideExprNoBF
    | LeftHandSideExprNoBF PLUSPLUS
    | LeftHandSideExprNoBF MINUSMINUS
    ;

UnaryExprCommon
    : DELETETOKEN UnaryExpr
    | VOIDTOKEN UnaryExpr
    | TYPEOF UnaryExpr
    | PLUSPLUS UnaryExpr
    //| AUTOPLUSPLUS UnaryExpr
    | MINUSMINUS UnaryExpr
    //| AUTOMINUSMINUS UnaryExpr
    | '+' UnaryExpr
    | '-' UnaryExpr
    | '~' UnaryExpr
    | '!' UnaryExpr
    ;

UnaryExpr
    : PostfixExpr
    | UnaryExprCommon
    ;

UnaryExprNoBF
    : PostfixExprNoBF
    | UnaryExprCommon
    ;

MultiplicativeExpr
    : UnaryExpr
    | MultiplicativeExpr '*' UnaryExpr
    | MultiplicativeExpr '/' UnaryExpr
    | MultiplicativeExpr '%' UnaryExpr
    ;

MultiplicativeExprNoBF
    : UnaryExprNoBF
    | MultiplicativeExprNoBF '*' UnaryExpr
    | MultiplicativeExprNoBF '/' UnaryExpr
    | MultiplicativeExprNoBF '%' UnaryExpr
    ;

AdditiveExpr
    : MultiplicativeExpr
    | AdditiveExpr '+' MultiplicativeExpr
    | AdditiveExpr '-' MultiplicativeExpr
    ;

AdditiveExprNoBF
    : MultiplicativeExprNoBF
    | AdditiveExprNoBF '+' MultiplicativeExpr
    | AdditiveExprNoBF '-' MultiplicativeExpr
    ;

ShiftExpr
    : AdditiveExpr
    | ShiftExpr LSHIFT AdditiveExpr
    | ShiftExpr RSHIFT AdditiveExpr
    | ShiftExpr URSHIFT AdditiveExpr
    ;

ShiftExprNoBF
    : AdditiveExprNoBF
    | ShiftExprNoBF LSHIFT AdditiveExpr
    | ShiftExprNoBF RSHIFT AdditiveExpr
    | ShiftExprNoBF URSHIFT AdditiveExpr
    ;

RelationalExpr
    : ShiftExpr
    | RelationalExpr '<' ShiftExpr
    | RelationalExpr '>' ShiftExpr
    | RelationalExpr LE ShiftExpr
    | RelationalExpr GE ShiftExpr
    | RelationalExpr INSTANCEOF ShiftExpr
    | RelationalExpr INTOKEN ShiftExpr
    ;

RelationalExprNoIn
    : ShiftExpr
    | RelationalExprNoIn '<' ShiftExpr
    | RelationalExprNoIn '>' ShiftExpr
    | RelationalExprNoIn LE ShiftExpr
    | RelationalExprNoIn GE ShiftExpr
    | RelationalExprNoIn INSTANCEOF ShiftExpr
    ;

RelationalExprNoBF
    : ShiftExprNoBF
    | RelationalExprNoBF '<' ShiftExpr
    | RelationalExprNoBF '>' ShiftExpr
    | RelationalExprNoBF LE ShiftExpr
    | RelationalExprNoBF GE ShiftExpr
    | RelationalExprNoBF INSTANCEOF ShiftExpr
    | RelationalExprNoBF INTOKEN ShiftExpr
    ;

EqualityExpr
    : RelationalExpr
    | EqualityExpr EQEQ RelationalExpr
    | EqualityExpr NE RelationalExpr
    | EqualityExpr STREQ RelationalExpr
    | EqualityExpr STRNEQ RelationalExpr
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

Program
    : 
    | SourceElements
    ;

SourceElements
    : Statement
    | SourceElements Statement
    ;

