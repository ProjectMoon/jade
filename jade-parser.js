/* Jison generated parser */
var jadeParser = (function(){

	var ASTNode = module.exports.ASTNode = function(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"block_list":4,"EOF":5,"statement_list":6,"statement":7,"expression_statement":8,"function_declaration":9,"if_statement":10,"block":11,"{":12,"}":13,"IF":14,"(":15,"e":16,")":17,"DEF":18,"IDENT":19,"function_body":20,"function_formal_parameters":21,",":22,";":23,"+":24,"-":25,"*":26,"/":27,"^":28,"postfix_expression":29,"atom":30,".":31,"[":32,"]":33,"function_call_parameters":34,"!":35,"NUMBER":36,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"{",13:"}",14:"IF",15:"(",17:")",18:"DEF",19:"IDENT",22:",",23:";",24:"+",25:"-",26:"*",27:"/",28:"^",31:".",32:"[",33:"]",35:"!",36:"NUMBER"},
productions_: [0,[3,2],[3,2],[7,1],[7,1],[7,1],[6,1],[6,2],[11,3],[4,1],[4,2],[10,5],[9,7],[9,8],[21,1],[21,3],[20,1],[20,1],[8,2],[8,1],[16,3],[16,3],[16,3],[16,3],[16,3],[16,2],[16,1],[29,1],[29,3],[29,4],[29,3],[29,4],[29,4],[29,5],[34,1],[34,3],[30,1],[30,1],[30,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:
			module.exports.parseResult = $$[$0-1];
		
break;
case 2:
			module.exports.parseResult = $$[$0-1];
		
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
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-5], funcInfo);
		
break;
case 13:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-6], funcInfo);
		
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19: this.$ = undefined; 
break;
case 20:
			this.$ = new ASTNode('+', $$[$0-2], $$[$0]);
		
break;
case 21:
			this.$ = new ASTNode('-', $$[$0-2], $$[$0]);
		
break;
case 22:
			this.$ = new ASTNode('*', $$[$0-2], $$[$0]);
		
break;
case 23:
			this.$ = new ASTNode('/', $$[$0-2], $$[$0]);
		
break;
case 24:
			this.$ = new ASTNode('^', $$[$0-2], $$[$0]);
		
break;
case 25:
			this.$ = new ASTNode('*', -1, $$[$0]);
		
break;
case 27: this.$ = $$[$0]; 
break;
case 28: this.$ = new ASTNode('Property', $$[$0-2], $$[$0]); 
break;
case 29: this.$ = new ASTNode('Array', $$[$0-3], $$[$0-1]); 
break;
case 30:
			this.$ = new ASTNode('FunctionCall', $$[$0-2], null);
		
break;
case 31:
			this.$ = new ASTNode('FunctionCall', $$[$0-3], $$[$0-1]);
		
break;
case 32:
			this.$ = new ASTNode('AsyncCall', $$[$0-3], null);
		
break;
case 33:
			this.$ = new ASTNode('AsyncCall', $$[$0-4], $$[$0-2]);
		
break;
case 34: this.$ = $$[$0] 
break;
case 35: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 36:
			this.$ = Number($$[$0]);
		
break;
case 37:
			this.$ = $$[$0];
		
break;
case 38: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:5,8:7,9:8,10:9,11:4,12:[1,6],14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{1:[3]},{5:[1,20],11:21,12:[1,6]},{5:[1,22],7:23,8:7,9:8,10:9,14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{5:[2,9],12:[2,9]},{5:[2,6],13:[2,6],14:[2,6],15:[2,6],18:[2,6],19:[2,6],23:[2,6],25:[2,6],36:[2,6]},{6:24,7:5,8:7,9:8,10:9,14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{5:[2,3],13:[2,3],14:[2,3],15:[2,3],18:[2,3],19:[2,3],23:[2,3],25:[2,3],36:[2,3]},{5:[2,4],13:[2,4],14:[2,4],15:[2,4],18:[2,4],19:[2,4],23:[2,4],25:[2,4],36:[2,4]},{5:[2,5],13:[2,5],14:[2,5],15:[2,5],18:[2,5],19:[2,5],23:[2,5],25:[2,5],36:[2,5]},{23:[1,25],24:[1,26],25:[1,27],26:[1,28],27:[1,29],28:[1,30]},{5:[2,19],13:[2,19],14:[2,19],15:[2,19],18:[2,19],19:[2,19],23:[2,19],25:[2,19],36:[2,19]},{19:[1,31]},{15:[1,32]},{15:[1,19],16:33,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,36],17:[2,26],22:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],31:[1,34],32:[1,35],33:[2,26],35:[1,37]},{15:[2,27],17:[2,27],22:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],31:[2,27],32:[2,27],33:[2,27],35:[2,27]},{15:[2,36],17:[2,36],22:[2,36],23:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],31:[2,36],32:[2,36],33:[2,36],35:[2,36]},{15:[2,37],17:[2,37],22:[2,37],23:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],31:[2,37],32:[2,37],33:[2,37],35:[2,37]},{15:[1,19],16:38,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{1:[2,1]},{5:[2,10],12:[2,10]},{1:[2,2]},{5:[2,7],13:[2,7],14:[2,7],15:[2,7],18:[2,7],19:[2,7],23:[2,7],25:[2,7],36:[2,7]},{7:23,8:7,9:8,10:9,13:[1,39],14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{5:[2,18],13:[2,18],14:[2,18],15:[2,18],18:[2,18],19:[2,18],23:[2,18],25:[2,18],36:[2,18]},{15:[1,19],16:40,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,19],16:41,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,19],16:42,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,19],16:43,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,19],16:44,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,45]},{15:[1,19],16:46,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{17:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],33:[2,25]},{19:[1,47]},{15:[1,19],16:48,19:[1,18],25:[1,14],29:15,30:16,36:[1,17]},{15:[1,19],16:51,17:[1,49],19:[1,18],25:[1,14],29:15,30:16,34:50,36:[1,17]},{15:[1,52]},{17:[1,53],24:[1,26],25:[1,27],26:[1,28],27:[1,29],28:[1,30]},{5:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],18:[2,8],19:[2,8],23:[2,8],25:[2,8],36:[2,8]},{17:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[1,28],27:[1,29],28:[1,30],33:[2,20]},{17:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[1,28],27:[1,29],28:[1,30],33:[2,21]},{17:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[1,30],33:[2,22]},{17:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[1,30],33:[2,23]},{17:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],33:[2,24]},{17:[1,54],19:[1,56],21:55},{17:[1,57],24:[1,26],25:[1,27],26:[1,28],27:[1,29],28:[1,30]},{15:[2,28],17:[2,28],22:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],31:[2,28],32:[2,28],33:[2,28],35:[2,28]},{24:[1,26],25:[1,27],26:[1,28],27:[1,29],28:[1,30],33:[1,58]},{15:[2,30],17:[2,30],22:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],31:[2,30],32:[2,30],33:[2,30],35:[2,30]},{17:[1,59]},{17:[2,34],22:[1,60],24:[1,26],25:[1,27],26:[1,28],27:[1,29],28:[1,30]},{15:[1,19],16:51,17:[1,61],19:[1,18],25:[1,14],29:15,30:16,34:62,36:[1,17]},{15:[2,38],17:[2,38],22:[2,38],23:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],31:[2,38],32:[2,38],33:[2,38],35:[2,38]},{12:[1,63]},{17:[1,64],22:[1,65]},{17:[2,14],22:[2,14]},{11:66,12:[1,6]},{15:[2,29],17:[2,29],22:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],31:[2,29],32:[2,29],33:[2,29],35:[2,29]},{15:[2,31],17:[2,31],22:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],31:[2,31],32:[2,31],33:[2,31],35:[2,31]},{15:[1,19],16:51,19:[1,18],25:[1,14],29:15,30:16,34:67,36:[1,17]},{15:[2,32],17:[2,32],22:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],31:[2,32],32:[2,32],33:[2,32],35:[2,32]},{17:[1,68]},{6:70,7:5,8:7,9:8,10:9,11:71,12:[1,6],14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],20:69,23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{12:[1,72]},{19:[1,73]},{5:[2,11],13:[2,11],14:[2,11],15:[2,11],18:[2,11],19:[2,11],23:[2,11],25:[2,11],36:[2,11]},{17:[2,35]},{15:[2,33],17:[2,33],22:[2,33],23:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],31:[2,33],32:[2,33],33:[2,33],35:[2,33]},{13:[1,74]},{7:23,8:7,9:8,10:9,13:[2,16],14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{13:[2,17]},{6:70,7:5,8:7,9:8,10:9,11:71,12:[1,6],14:[1,13],15:[1,19],16:10,18:[1,12],19:[1,18],20:75,23:[1,11],25:[1,14],29:15,30:16,36:[1,17]},{17:[2,15],22:[2,15]},{5:[2,12],13:[2,12],14:[2,12],15:[2,12],18:[2,12],19:[2,12],23:[2,12],25:[2,12],36:[2,12]},{13:[1,76]},{5:[2,13],13:[2,13],14:[2,13],15:[2,13],18:[2,13],19:[2,13],23:[2,13],25:[2,13],36:[2,13]}],
defaultActions: {20:[2,1],22:[2,2],67:[2,35],71:[2,17]},
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
case 1:return 36
break;
case 2:return 26
break;
case 3:return 27
break;
case 4:return 25
break;
case 5:return 24
break;
case 6:return 28
break;
case 7:return 35
break;
case 8:return '%'
break;
case 9:return 15
break;
case 10:return 17
break;
case 11:return 23
break;
case 12:return 31
break;
case 13:return 22
break;
case 14:return 32
break;
case 15:return 33
break;
case 16:return 12
break;
case 17:return 13
break;
case 18:return 18
break;
case 19:return 14
break;
case 20:return 19
break;
case 21:return 5
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^!/,/^%/,/^\(/,/^\)/,/^;/,/^\./,/^,/,/^\[/,/^\]/,/^\{/,/^\}/,/^def\b/,/^if\b/,/^[a-zA-Z_]+([0-9a-zA-Z_])*/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jadeParser;
exports.parse = function () { return jadeParser.parse.apply(jadeParser, arguments); }
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