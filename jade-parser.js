/* Jison generated parser */
var jadeParser = (function(){

	var ASTNode = module.exports.ASTNode = function(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"block_list":4,"EOF":5,"statement_list":6,"statement":7,"expression_statement":8,"init_variable":9,"assign_variable":10,"function_declaration":11,"if_statement":12,"block":13,"{":14,"}":15,"IF":16,"(":17,"e":18,")":19,"VAR":20,"IDENT":21,"=":22,"DEF":23,"function_body":24,"function_formal_parameters":25,",":26,";":27,"+":28,"-":29,"*":30,"/":31,"^":32,"postfix_expression":33,"atom":34,".":35,"[":36,"]":37,"function_call_parameters":38,"!":39,"NUMBER":40,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"{",15:"}",16:"IF",17:"(",19:")",20:"VAR",21:"IDENT",22:"=",23:"DEF",26:",",27:";",28:"+",29:"-",30:"*",31:"/",32:"^",35:".",36:"[",37:"]",39:"!",40:"NUMBER"},
productions_: [0,[3,2],[3,2],[7,1],[7,1],[7,1],[7,1],[7,1],[6,1],[6,2],[13,3],[4,1],[4,2],[12,5],[9,4],[10,3],[11,7],[11,8],[25,1],[25,3],[24,1],[24,1],[8,2],[8,1],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,1],[33,1],[33,3],[33,4],[33,3],[33,4],[33,4],[33,5],[38,1],[38,3],[34,1],[34,1],[34,3]],
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
			this.$ = $$[$0];
		
break;
case 7:
			this.$ = $$[$0];
		
break;
case 8:
			this.$ = [ $$[$0] ];
		
break;
case 9:
			if ($$[$0-1] instanceof Array) {
				$$[$0-1].push($$[$0]);
				this.$ = $$[$0-1];
			}
			else {
				this.$ = [ $$[$0-1], $$[$0] ];
			}
		
break;
case 10:
			this.$ = $$[$0-1];
		
break;
case 11: this.$ = [ $$[$0] ]; 
break;
case 12:
			if ($$[$0-1] instanceof Array) {
				$$[$0-1].push($$[$0]);
				this.$ = $$[$0-1];
			}
			else {
				this.$ = [ $$[$0-1], $$[$0] ];
			}
		
break;
case 13:
			this.$ = new ASTNode('If', $$[$0-2], $$[$0]);
		
break;
case 14:
			this.$ = new ASTNode('InitVariable', $$[$0-2], $$[$0]);
		
break;
case 15:
			this.$ = new ASTNode('AssignVariable', $$[$0-2], $$[$0]);
		
break;
case 16:
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-5], funcInfo);
		
break;
case 17:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-6], funcInfo);
		
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 22: this.$ = $$[$0-1]; 
break;
case 23: this.$ = undefined; 
break;
case 24:
			this.$ = new ASTNode('+', $$[$0-2], $$[$0]);
		
break;
case 25:
			this.$ = new ASTNode('-', $$[$0-2], $$[$0]);
		
break;
case 26:
			this.$ = new ASTNode('*', $$[$0-2], $$[$0]);
		
break;
case 27:
			this.$ = new ASTNode('/', $$[$0-2], $$[$0]);
		
break;
case 28:
			this.$ = new ASTNode('^', $$[$0-2], $$[$0]);
		
break;
case 29:
			this.$ = new ASTNode('*', -1, $$[$0]);
		
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new ASTNode('Property', $$[$0-2], $$[$0]); 
break;
case 33: this.$ = new ASTNode('Array', $$[$0-3], $$[$0-1]); 
break;
case 34:
			this.$ = new ASTNode('FunctionCall', $$[$0-2], null);
		
break;
case 35:
			this.$ = new ASTNode('FunctionCall', $$[$0-3], $$[$0-1]);
		
break;
case 36:
			this.$ = new ASTNode('AsyncCall', $$[$0-3], null);
		
break;
case 37:
			this.$ = new ASTNode('AsyncCall', $$[$0-4], $$[$0-2]);
		
break;
case 38: this.$ = $$[$0] 
break;
case 39: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 40:
			this.$ = Number($$[$0]);
		
break;
case 41:
			this.$ = $$[$0];
		
break;
case 42: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:5,8:7,9:8,10:9,11:10,12:11,13:4,14:[1,6],16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{1:[3]},{5:[1,23],13:24,14:[1,6]},{5:[1,25],7:26,8:7,9:8,10:9,11:10,12:11,16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{5:[2,11],14:[2,11]},{5:[2,8],15:[2,8],16:[2,8],17:[2,8],20:[2,8],21:[2,8],23:[2,8],27:[2,8],29:[2,8],40:[2,8]},{6:27,7:5,8:7,9:8,10:9,11:10,12:11,16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{5:[2,3],15:[2,3],16:[2,3],17:[2,3],20:[2,3],21:[2,3],23:[2,3],27:[2,3],29:[2,3],40:[2,3]},{5:[2,4],15:[2,4],16:[2,4],17:[2,4],20:[2,4],21:[2,4],23:[2,4],27:[2,4],29:[2,4],40:[2,4]},{5:[2,5],15:[2,5],16:[2,5],17:[2,5],20:[2,5],21:[2,5],23:[2,5],27:[2,5],29:[2,5],40:[2,5]},{5:[2,6],15:[2,6],16:[2,6],17:[2,6],20:[2,6],21:[2,6],23:[2,6],27:[2,6],29:[2,6],40:[2,6]},{5:[2,7],15:[2,7],16:[2,7],17:[2,7],20:[2,7],21:[2,7],23:[2,7],27:[2,7],29:[2,7],40:[2,7]},{27:[1,28],28:[1,29],29:[1,30],30:[1,31],31:[1,32],32:[1,33]},{5:[2,23],15:[2,23],16:[2,23],17:[2,23],20:[2,23],21:[2,23],23:[2,23],27:[2,23],29:[2,23],40:[2,23]},{21:[1,34]},{17:[2,41],22:[1,35],27:[2,41],28:[2,41],29:[2,41],30:[2,41],31:[2,41],32:[2,41],35:[2,41],36:[2,41],39:[2,41]},{21:[1,36]},{17:[1,37]},{17:[1,22],18:38,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,42],19:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],30:[2,30],31:[2,30],32:[2,30],35:[1,40],36:[1,41],37:[2,30],39:[1,43]},{17:[2,31],19:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],30:[2,31],31:[2,31],32:[2,31],35:[2,31],36:[2,31],37:[2,31],39:[2,31]},{17:[2,40],19:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],30:[2,40],31:[2,40],32:[2,40],35:[2,40],36:[2,40],37:[2,40],39:[2,40]},{17:[1,22],18:44,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{1:[2,1]},{5:[2,12],14:[2,12]},{1:[2,2]},{5:[2,9],15:[2,9],16:[2,9],17:[2,9],20:[2,9],21:[2,9],23:[2,9],27:[2,9],29:[2,9],40:[2,9]},{7:26,8:7,9:8,10:9,11:10,12:11,15:[1,45],16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{5:[2,22],15:[2,22],16:[2,22],17:[2,22],20:[2,22],21:[2,22],23:[2,22],27:[2,22],29:[2,22],40:[2,22]},{17:[1,22],18:46,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,22],18:47,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,22],18:48,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,22],18:49,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,22],18:50,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{22:[1,51]},{8:52,17:[1,22],18:12,21:[1,39],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,53]},{17:[1,22],18:54,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{19:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],30:[2,29],31:[2,29],32:[2,29],37:[2,29]},{17:[2,41],19:[2,41],26:[2,41],27:[2,41],28:[2,41],29:[2,41],30:[2,41],31:[2,41],32:[2,41],35:[2,41],36:[2,41],37:[2,41],39:[2,41]},{21:[1,55]},{17:[1,22],18:56,21:[1,39],29:[1,18],33:19,34:20,40:[1,21]},{17:[1,22],18:59,19:[1,57],21:[1,39],29:[1,18],33:19,34:20,38:58,40:[1,21]},{17:[1,60]},{19:[1,61],28:[1,29],29:[1,30],30:[1,31],31:[1,32],32:[1,33]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],17:[2,10],20:[2,10],21:[2,10],23:[2,10],27:[2,10],29:[2,10],40:[2,10]},{19:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],30:[1,31],31:[1,32],32:[1,33],37:[2,24]},{19:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],30:[1,31],31:[1,32],32:[1,33],37:[2,25]},{19:[2,26],26:[2,26],27:[2,26],28:[2,26],29:[2,26],30:[2,26],31:[2,26],32:[1,33],37:[2,26]},{19:[2,27],26:[2,27],27:[2,27],28:[2,27],29:[2,27],30:[2,27],31:[2,27],32:[1,33],37:[2,27]},{19:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[2,28],30:[2,28],31:[2,28],32:[2,28],37:[2,28]},{8:62,17:[1,22],18:12,21:[1,39],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{5:[2,15],15:[2,15],16:[2,15],17:[2,15],20:[2,15],21:[2,15],23:[2,15],27:[2,15],29:[2,15],40:[2,15]},{19:[1,63],21:[1,65],25:64},{19:[1,66],28:[1,29],29:[1,30],30:[1,31],31:[1,32],32:[1,33]},{17:[2,32],19:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],30:[2,32],31:[2,32],32:[2,32],35:[2,32],36:[2,32],37:[2,32],39:[2,32]},{28:[1,29],29:[1,30],30:[1,31],31:[1,32],32:[1,33],37:[1,67]},{17:[2,34],19:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],30:[2,34],31:[2,34],32:[2,34],35:[2,34],36:[2,34],37:[2,34],39:[2,34]},{19:[1,68]},{19:[2,38],26:[1,69],28:[1,29],29:[1,30],30:[1,31],31:[1,32],32:[1,33]},{17:[1,22],18:59,19:[1,70],21:[1,39],29:[1,18],33:19,34:20,38:71,40:[1,21]},{17:[2,42],19:[2,42],26:[2,42],27:[2,42],28:[2,42],29:[2,42],30:[2,42],31:[2,42],32:[2,42],35:[2,42],36:[2,42],37:[2,42],39:[2,42]},{5:[2,14],15:[2,14],16:[2,14],17:[2,14],20:[2,14],21:[2,14],23:[2,14],27:[2,14],29:[2,14],40:[2,14]},{14:[1,72]},{19:[1,73],26:[1,74]},{19:[2,18],26:[2,18]},{13:75,14:[1,6]},{17:[2,33],19:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],30:[2,33],31:[2,33],32:[2,33],35:[2,33],36:[2,33],37:[2,33],39:[2,33]},{17:[2,35],19:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],31:[2,35],32:[2,35],35:[2,35],36:[2,35],37:[2,35],39:[2,35]},{17:[1,22],18:59,21:[1,39],29:[1,18],33:19,34:20,38:76,40:[1,21]},{17:[2,36],19:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],30:[2,36],31:[2,36],32:[2,36],35:[2,36],36:[2,36],37:[2,36],39:[2,36]},{19:[1,77]},{6:79,7:5,8:7,9:8,10:9,11:10,12:11,13:80,14:[1,6],16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],24:78,27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{14:[1,81]},{21:[1,82]},{5:[2,13],15:[2,13],16:[2,13],17:[2,13],20:[2,13],21:[2,13],23:[2,13],27:[2,13],29:[2,13],40:[2,13]},{19:[2,39]},{17:[2,37],19:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],31:[2,37],32:[2,37],35:[2,37],36:[2,37],37:[2,37],39:[2,37]},{15:[1,83]},{7:26,8:7,9:8,10:9,11:10,12:11,15:[2,20],16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{15:[2,21]},{6:79,7:5,8:7,9:8,10:9,11:10,12:11,13:80,14:[1,6],16:[1,17],17:[1,22],18:12,20:[1,14],21:[1,15],23:[1,16],24:84,27:[1,13],29:[1,18],33:19,34:20,40:[1,21]},{19:[2,19],26:[2,19]},{5:[2,16],15:[2,16],16:[2,16],17:[2,16],20:[2,16],21:[2,16],23:[2,16],27:[2,16],29:[2,16],40:[2,16]},{15:[1,85]},{5:[2,17],15:[2,17],16:[2,17],17:[2,17],20:[2,17],21:[2,17],23:[2,17],27:[2,17],29:[2,17],40:[2,17]}],
defaultActions: {23:[2,1],25:[2,2],76:[2,39],80:[2,21]},
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
case 1:return 40
break;
case 2:return 30
break;
case 3:return 31
break;
case 4:return 29
break;
case 5:return 28
break;
case 6:return 32
break;
case 7:return 39
break;
case 8:return '%'
break;
case 9:return 17
break;
case 10:return 19
break;
case 11:return 27
break;
case 12:return 35
break;
case 13:return 26
break;
case 14:return 36
break;
case 15:return 37
break;
case 16:return 14
break;
case 17:return 15
break;
case 18:return 22
break;
case 19:return 23
break;
case 20:return 20
break;
case 21:return 16
break;
case 22:return 21
break;
case 23:return 5
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^!/,/^%/,/^\(/,/^\)/,/^;/,/^\./,/^,/,/^\[/,/^\]/,/^\{/,/^\}/,/^=/,/^def\b/,/^var\b/,/^if\b/,/^[a-zA-Z_]+([0-9a-zA-Z_])*/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"inclusive":true}};return lexer;})()
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