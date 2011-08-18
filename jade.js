/* Jison generated parser */
var jade = (function(){

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

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"block_list":4,"EOF":5,"statement_list":6,"statement":7,"expression_statement":8,"function_declaration":9,"if_statement":10,"block":11,"{":12,"}":13,"IF":14,"(":15,"e":16,")":17,"DEF":18,"IDENT":19,"function_body":20,";":21,"+":22,"-":23,"*":24,"/":25,"^":26,"NUMBER":27,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"{",13:"}",14:"IF",15:"(",17:")",18:"DEF",19:"IDENT",21:";",22:"+",23:"-",24:"*",25:"/",26:"^",27:"NUMBER"},
productions_: [0,[3,2],[3,2],[7,1],[7,1],[7,1],[6,1],[6,2],[11,3],[4,1],[4,2],[10,5],[9,7],[20,1],[20,1],[8,2],[8,1],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,2],[16,1],[16,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:
			console.log(JSON.stringify($$[$0-1], null, 2));
		
break;
case 2:
			console.log(JSON.stringify($$[$0-1], null, 2));
		
break;
case 3:
			this.$ = $$[$0];
		
break;
case 4:
			this.$ = $$[$0];
		
break;
case 5:
			this.$ = $$[$0];
		
break;
case 6:
			this.$ = [ $$[$0] ];
		
break;
case 7:
			if ($$[$0-1] instanceof Array) {
				$$[$0-1].push($$[$0]);
				this.$ = $$[$0-1];
			}
			else {
				this.$ = [ $$[$0-1], $$[$0] ];
			}
		
break;
case 8:
			this.$ = $$[$0-1];
		
break;
case 9: this.$ = [ $$[$0] ]; 
break;
case 10:
			if ($$[$0-1] instanceof Array) {
				$$[$0-1].push($$[$0]);
				this.$ = $$[$0-1];
			}
			else {
				this.$ = [ $$[$0-1], $$[$0] ];
			}
		
break;
case 11:
			this.$ = new ASTNode('If', $$[$0-2], $$[$0]);
		
break;
case 12:
			this.$ = new ASTNode('FunctionDef', $$[$0-5], $$[$0-1]);
		
break;
case 15: this.$ = $$[$0-1]; 
break;
case 16: this.$ = undefined; 
break;
case 17:
			this.$ = $$[$0-1];
		
break;
case 18:
			this.$ = new ASTNode('+', $$[$0-2], $$[$0]);
		
break;
case 19:
			this.$ = new ASTNode('-', $$[$0-2], $$[$0]);
		
break;
case 20:
			this.$ = new ASTNode('*', $$[$0-2], $$[$0]);
		
break;
case 21:
			this.$ = new ASTNode('/', $$[$0-2], $$[$0]);
		
break;
case 22:
			this.$ = new ASTNode('^', $$[$0-2], $$[$0]);
		
break;
case 23:
			this.$ = new ASTNode('*', -1, $$[$0]);
		
break;
case 24:
			this.$ = Number($$[$0]);
		
break;
case 25:
			this.$ = $$[$0];
		
break;
}
},
table: [{3:1,4:2,6:3,7:5,8:7,9:8,10:9,11:4,12:[1,6],14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],21:[1,11],23:[1,15],27:[1,16]},{1:[3]},{5:[1,18],11:19,12:[1,6]},{5:[1,20],7:21,8:7,9:8,10:9,14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],21:[1,11],23:[1,15],27:[1,16]},{5:[2,9],12:[2,9]},{5:[2,6],13:[2,6],14:[2,6],15:[2,6],18:[2,6],19:[2,6],21:[2,6],23:[2,6],27:[2,6]},{6:22,7:5,8:7,9:8,10:9,14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],21:[1,11],23:[1,15],27:[1,16]},{5:[2,3],13:[2,3],14:[2,3],15:[2,3],18:[2,3],19:[2,3],21:[2,3],23:[2,3],27:[2,3]},{5:[2,4],13:[2,4],14:[2,4],15:[2,4],18:[2,4],19:[2,4],21:[2,4],23:[2,4],27:[2,4]},{5:[2,5],13:[2,5],14:[2,5],15:[2,5],18:[2,5],19:[2,5],21:[2,5],23:[2,5],27:[2,5]},{21:[1,23],22:[1,24],23:[1,25],24:[1,26],25:[1,27],26:[1,28]},{5:[2,16],13:[2,16],14:[2,16],15:[2,16],18:[2,16],19:[2,16],21:[2,16],23:[2,16],27:[2,16]},{19:[1,29]},{15:[1,30]},{15:[1,14],16:31,19:[1,17],23:[1,15],27:[1,16]},{15:[1,14],16:32,19:[1,17],23:[1,15],27:[1,16]},{17:[2,24],21:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24]},{17:[2,25],21:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25]},{1:[2,1]},{5:[2,10],12:[2,10]},{1:[2,2]},{5:[2,7],13:[2,7],14:[2,7],15:[2,7],18:[2,7],19:[2,7],21:[2,7],23:[2,7],27:[2,7]},{7:21,8:7,9:8,10:9,13:[1,33],14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],21:[1,11],23:[1,15],27:[1,16]},{5:[2,15],13:[2,15],14:[2,15],15:[2,15],18:[2,15],19:[2,15],21:[2,15],23:[2,15],27:[2,15]},{15:[1,14],16:34,19:[1,17],23:[1,15],27:[1,16]},{15:[1,14],16:35,19:[1,17],23:[1,15],27:[1,16]},{15:[1,14],16:36,19:[1,17],23:[1,15],27:[1,16]},{15:[1,14],16:37,19:[1,17],23:[1,15],27:[1,16]},{15:[1,14],16:38,19:[1,17],23:[1,15],27:[1,16]},{15:[1,39]},{15:[1,14],16:40,19:[1,17],23:[1,15],27:[1,16]},{17:[1,41],22:[1,24],23:[1,25],24:[1,26],25:[1,27],26:[1,28]},{17:[2,23],21:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23]},{5:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],18:[2,8],19:[2,8],21:[2,8],23:[2,8],27:[2,8]},{17:[2,18],21:[2,18],22:[2,18],23:[2,18],24:[1,26],25:[1,27],26:[1,28]},{17:[2,19],21:[2,19],22:[2,19],23:[2,19],24:[1,26],25:[1,27],26:[1,28]},{17:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[1,28]},{17:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[1,28]},{17:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22]},{17:[1,42]},{17:[1,43],22:[1,24],23:[1,25],24:[1,26],25:[1,27],26:[1,28]},{17:[2,17],21:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17]},{12:[1,44]},{11:45,12:[1,6]},{6:47,7:5,8:7,9:8,10:9,11:48,12:[1,6],14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],20:46,21:[1,11],23:[1,15],27:[1,16]},{5:[2,11],13:[2,11],14:[2,11],15:[2,11],18:[2,11],19:[2,11],21:[2,11],23:[2,11],27:[2,11]},{13:[1,49]},{7:21,8:7,9:8,10:9,13:[2,13],14:[1,13],15:[1,14],16:10,18:[1,12],19:[1,17],21:[1,11],23:[1,15],27:[1,16]},{13:[2,14]},{5:[2,12],13:[2,12],14:[2,12],15:[2,12],18:[2,12],19:[2,12],21:[2,12],23:[2,12],27:[2,12]}],
defaultActions: {18:[2,1],20:[2,2],48:[2,14]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 27
break;
case 2:return 24
break;
case 3:return 25
break;
case 4:return 23
break;
case 5:return 22
break;
case 6:return 26
break;
case 7:return '!'
break;
case 8:return '%'
break;
case 9:return 15
break;
case 10:return 17
break;
case 11:return 21
break;
case 12:return 12
break;
case 13:return 13
break;
case 14:return 18
break;
case 15:return 14
break;
case 16:return 19
break;
case 17:return 5
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^!/,/^%/,/^\(/,/^\)/,/^;/,/^\{/,/^\}/,/^def\b/,/^if\b/,/^[A-z|a-z]+([A-z|a-z|0-9])*/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jade;
exports.parse = function () { return jade.parse.apply(jade, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}