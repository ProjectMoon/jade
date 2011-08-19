/* Jison generated parser */
var jadeParser = (function(){

	var ASTNode = module.exports.ASTNode = function(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"block_list":4,"EOF":5,"statement_list":6,"statement":7,"expression_statement":8,"init_variable":9,"assign_variable":10,"function_declaration":11,"if_statement":12,"end_async_statement":13,"block":14,"{":15,"}":16,"IF":17,"(":18,"e":19,")":20,":-":21,"return_statement":22,"RETURN":23,"!":24,"expression_list":25,";":26,"VAR":27,"ident_list":28,"=":29,"IDENT":30,"<":31,">":32,",":33,"DEF":34,"function_body":35,"function_formal_parameters":36,"+":37,"-":38,"*":39,"/":40,"^":41,"postfix_expression":42,"atom":43,".":44,"PROTOTYPE":45,"[":46,"]":47,"function_call_parameters":48,"NUMBER":49,"STRING_LITERAL":50,"LIST_LITERAL":51,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",15:"{",16:"}",17:"IF",18:"(",20:")",21:":-",23:"RETURN",24:"!",26:";",27:"VAR",29:"=",30:"IDENT",31:"<",32:">",33:",",34:"DEF",37:"+",38:"-",39:"*",40:"/",41:"^",44:".",45:"PROTOTYPE",46:"[",47:"]",49:"NUMBER",50:"STRING_LITERAL",51:"LIST_LITERAL"},
productions_: [0,[3,2],[3,2],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[6,1],[6,2],[14,3],[4,1],[4,2],[12,5],[13,1],[22,2],[22,1],[22,4],[22,2],[9,4],[10,3],[10,5],[28,1],[28,3],[11,7],[11,8],[11,8],[11,9],[36,1],[36,3],[35,1],[35,1],[35,1],[25,1],[25,3],[8,2],[8,1],[19,3],[19,3],[19,3],[19,3],[19,3],[19,2],[19,1],[42,1],[42,3],[42,3],[42,4],[42,3],[42,4],[42,4],[42,5],[48,1],[48,3],[43,1],[43,1],[43,1],[43,1],[43,3]],
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
case 9:
			this.$ = [ $$[$0] ];
		
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
			this.$ = $$[$0-1];
		
break;
case 12: this.$ = [ $$[$0] ]; 
break;
case 13:
			if ($$[$0-1] instanceof Array) {
				$$[$0-1].push($$[$0]);
				this.$ = $$[$0-1];
			}
			else {
				this.$ = [ $$[$0-1], $$[$0] ];
			}
		
break;
case 14:
			this.$ = new ASTNode('If', $$[$0-2], $$[$0]);
		
break;
case 15:
			this.$ = new ASTNode('EndAsync', null, null);
		
break;
case 16:
			this.$ = new ASTNode('Return', $$[$0], null);
		
break;
case 17:
			this.$ = new ASTNode('Return', null, null);
		
break;
case 18:
			this.$ = new ASTNode('AsyncReturn', { values: $$[$0-1] }, null);
		
break;
case 19:
			this.$ = new ASTNode('AsyncReturn', { values: null }, null);
		
break;
case 20:
			this.$ = new ASTNode('InitVariable', { idents: $$[$0-2] }, $$[$0]);
		
break;
case 21:
			this.$ = new ASTNode('AssignVariable', { idents: [ $$[$0-2] ] }, $$[$0]);
		
break;
case 22:
			this.$ = new ASTNode('AssignVariable', { idents: $$[$0-3] }, $$[$0]);
		
break;
case 23: this.$ = [ $$[$0] ]; 
break;
case 24:
			if ($$[$0-2] instanceof Array) {
				$$[$0-2].push($$[$0]);
				this.$ = $$[$0-2];
			}
			else {
				this.$ = [ $$[$0-2], $$[$0] ];
			}
		
break;
case 25:
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-5], funcInfo);
		
break;
case 26:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-6], funcInfo);
		
break;
case 27:
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('AsyncFunctionDef', $$[$0-6], funcInfo);
		
break;
case 28:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('AsyncFunctionDef', $$[$0-7], funcInfo);
		
break;
case 29: this.$ = $$[$0]; 
break;
case 30: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 33: this.$ = $$[$0]; 
break;
case 34:
			this.$ = [ $$[$0] ];
		
break;
case 35:
			if ($$[$0-2] instanceof Array) {
				$$[$0-2].push($$[$0]);
				this.$ = $$[$0-2];
			}
			else {
				this.$ = [ $$[$0-2], $$[$0] ];
			}
		
break;
case 36: 
			this.$ = new ASTNode('Expression', $$[$0-1], null);
		
break;
case 37: this.$ = new ASTNode('Expression', null, null); 
break;
case 38:
			this.$ = new ASTNode('+', $$[$0-2], $$[$0]);
		
break;
case 39:
			this.$ = new ASTNode('-', $$[$0-2], $$[$0]);
		
break;
case 40:
			this.$ = new ASTNode('*', $$[$0-2], $$[$0]);
		
break;
case 41:
			this.$ = new ASTNode('/', $$[$0-2], $$[$0]);
		
break;
case 42:
			this.$ = new ASTNode('^', $$[$0-2], $$[$0]);
		
break;
case 43:
			this.$ = new ASTNode('*', -1, $$[$0]);
		
break;
case 45: this.$ = $$[$0]; 
break;
case 46: this.$ = new ASTNode('Property', $$[$0-2], $$[$0]); 
break;
case 47: this.$ = new ASTNode('Prototype', $$[$0-2], $$[$0]); 
break;
case 48: this.$ = new ASTNode('Array', $$[$0-3], $$[$0-1]); 
break;
case 49:
			this.$ = new ASTNode('FunctionCall', $$[$0-2], null);
		
break;
case 50:
			this.$ = new ASTNode('FunctionCall', $$[$0-3], $$[$0-1]);
		
break;
case 51:
			this.$ = new ASTNode('AsyncCall', $$[$0-3], null);
		
break;
case 52:
			this.$ = new ASTNode('AsyncCall', $$[$0-4], $$[$0-2]);
		
break;
case 53: this.$ = $$[$0] 
break;
case 54: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 55:
			this.$ = Number($$[$0]);
		
break;
case 56:
			this.$ = $$[$0];
		
break;
case 57:
			this.$ = yytext;
		
break;
case 58:
			this.$ = yytext;
		
break;
case 59: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:5,8:7,9:8,10:9,11:10,12:11,13:12,14:4,15:[1,6],17:[1,19],18:[1,27],19:13,21:[1,20],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{1:[3]},{5:[1,28],14:29,15:[1,6]},{5:[1,30],7:31,8:7,9:8,10:9,11:10,12:11,13:12,17:[1,19],18:[1,27],19:13,21:[1,20],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{5:[2,12],15:[2,12]},{5:[2,9],16:[2,9],17:[2,9],18:[2,9],21:[2,9],26:[2,9],27:[2,9],30:[2,9],31:[2,9],34:[2,9],38:[2,9],49:[2,9],50:[2,9],51:[2,9]},{6:32,7:5,8:7,9:8,10:9,11:10,12:11,13:12,17:[1,19],18:[1,27],19:13,21:[1,20],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{5:[2,3],16:[2,3],17:[2,3],18:[2,3],21:[2,3],26:[2,3],27:[2,3],30:[2,3],31:[2,3],34:[2,3],38:[2,3],49:[2,3],50:[2,3],51:[2,3]},{5:[2,4],16:[2,4],17:[2,4],18:[2,4],21:[2,4],26:[2,4],27:[2,4],30:[2,4],31:[2,4],34:[2,4],38:[2,4],49:[2,4],50:[2,4],51:[2,4]},{5:[2,5],16:[2,5],17:[2,5],18:[2,5],21:[2,5],26:[2,5],27:[2,5],30:[2,5],31:[2,5],34:[2,5],38:[2,5],49:[2,5],50:[2,5],51:[2,5]},{5:[2,6],16:[2,6],17:[2,6],18:[2,6],21:[2,6],26:[2,6],27:[2,6],30:[2,6],31:[2,6],34:[2,6],38:[2,6],49:[2,6],50:[2,6],51:[2,6]},{5:[2,7],16:[2,7],17:[2,7],18:[2,7],21:[2,7],26:[2,7],27:[2,7],30:[2,7],31:[2,7],34:[2,7],38:[2,7],49:[2,7],50:[2,7],51:[2,7]},{5:[2,8],16:[2,8],17:[2,8],18:[2,8],21:[2,8],26:[2,8],27:[2,8],30:[2,8],31:[2,8],34:[2,8],38:[2,8],49:[2,8],50:[2,8],51:[2,8]},{26:[1,33],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]},{5:[2,37],16:[2,37],17:[2,37],18:[2,37],21:[2,37],26:[2,37],27:[2,37],30:[2,37],31:[2,37],34:[2,37],38:[2,37],49:[2,37],50:[2,37],51:[2,37]},{28:39,30:[1,40]},{18:[2,56],24:[2,56],26:[2,56],29:[1,41],37:[2,56],38:[2,56],39:[2,56],40:[2,56],41:[2,56],44:[2,56],45:[2,56],46:[2,56]},{28:42,30:[1,40]},{30:[1,43]},{18:[1,44]},{5:[2,15],16:[2,15],17:[2,15],18:[2,15],21:[2,15],26:[2,15],27:[2,15],30:[2,15],31:[2,15],34:[2,15],38:[2,15],49:[2,15],50:[2,15],51:[2,15]},{18:[1,27],19:45,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,50],20:[2,44],24:[1,51],26:[2,44],33:[2,44],37:[2,44],38:[2,44],39:[2,44],40:[2,44],41:[2,44],44:[1,47],45:[1,48],46:[1,49],47:[2,44]},{18:[2,45],20:[2,45],24:[2,45],26:[2,45],33:[2,45],37:[2,45],38:[2,45],39:[2,45],40:[2,45],41:[2,45],44:[2,45],45:[2,45],46:[2,45],47:[2,45]},{18:[2,55],20:[2,55],24:[2,55],26:[2,55],33:[2,55],37:[2,55],38:[2,55],39:[2,55],40:[2,55],41:[2,55],44:[2,55],45:[2,55],46:[2,55],47:[2,55]},{18:[2,57],20:[2,57],24:[2,57],26:[2,57],33:[2,57],37:[2,57],38:[2,57],39:[2,57],40:[2,57],41:[2,57],44:[2,57],45:[2,57],46:[2,57],47:[2,57]},{18:[2,58],20:[2,58],24:[2,58],26:[2,58],33:[2,58],37:[2,58],38:[2,58],39:[2,58],40:[2,58],41:[2,58],44:[2,58],45:[2,58],46:[2,58],47:[2,58]},{18:[1,27],19:52,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{1:[2,1]},{5:[2,13],15:[2,13]},{1:[2,2]},{5:[2,10],16:[2,10],17:[2,10],18:[2,10],21:[2,10],26:[2,10],27:[2,10],30:[2,10],31:[2,10],34:[2,10],38:[2,10],49:[2,10],50:[2,10],51:[2,10]},{7:31,8:7,9:8,10:9,11:10,12:11,13:12,16:[1,53],17:[1,19],18:[1,27],19:13,21:[1,20],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{5:[2,36],16:[2,36],17:[2,36],18:[2,36],21:[2,36],26:[2,36],27:[2,36],30:[2,36],31:[2,36],34:[2,36],38:[2,36],49:[2,36],50:[2,36],51:[2,36]},{18:[1,27],19:54,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,27],19:55,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,27],19:56,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,27],19:57,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,27],19:58,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{29:[1,59],33:[1,60]},{29:[2,23],32:[2,23],33:[2,23]},{8:61,18:[1,27],19:13,26:[1,14],30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{32:[1,62],33:[1,60]},{18:[1,63],24:[1,64]},{18:[1,27],19:65,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{20:[2,43],26:[2,43],33:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],47:[2,43]},{18:[2,56],20:[2,56],24:[2,56],26:[2,56],33:[2,56],37:[2,56],38:[2,56],39:[2,56],40:[2,56],41:[2,56],44:[2,56],45:[2,56],46:[2,56],47:[2,56]},{30:[1,66]},{30:[1,67]},{18:[1,27],19:68,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{18:[1,27],19:71,20:[1,69],30:[1,46],38:[1,21],42:22,43:23,48:70,49:[1,24],50:[1,25],51:[1,26]},{18:[1,72]},{20:[1,73],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]},{5:[2,11],15:[2,11],16:[2,11],17:[2,11],18:[2,11],21:[2,11],26:[2,11],27:[2,11],30:[2,11],31:[2,11],34:[2,11],38:[2,11],49:[2,11],50:[2,11],51:[2,11]},{20:[2,38],26:[2,38],33:[2,38],37:[2,38],38:[2,38],39:[1,36],40:[1,37],41:[1,38],47:[2,38]},{20:[2,39],26:[2,39],33:[2,39],37:[2,39],38:[2,39],39:[1,36],40:[1,37],41:[1,38],47:[2,39]},{20:[2,40],26:[2,40],33:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[1,38],47:[2,40]},{20:[2,41],26:[2,41],33:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[1,38],47:[2,41]},{20:[2,42],26:[2,42],33:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],47:[2,42]},{8:74,18:[1,27],19:13,26:[1,14],30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{30:[1,75]},{5:[2,21],16:[2,21],17:[2,21],18:[2,21],21:[2,21],26:[2,21],27:[2,21],30:[2,21],31:[2,21],34:[2,21],38:[2,21],49:[2,21],50:[2,21],51:[2,21]},{29:[1,76]},{20:[1,77],30:[1,79],36:78},{18:[1,80]},{20:[1,81],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]},{18:[2,46],20:[2,46],24:[2,46],26:[2,46],33:[2,46],37:[2,46],38:[2,46],39:[2,46],40:[2,46],41:[2,46],44:[2,46],45:[2,46],46:[2,46],47:[2,46]},{18:[2,47],20:[2,47],24:[2,47],26:[2,47],33:[2,47],37:[2,47],38:[2,47],39:[2,47],40:[2,47],41:[2,47],44:[2,47],45:[2,47],46:[2,47],47:[2,47]},{37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38],47:[1,82]},{18:[2,49],20:[2,49],24:[2,49],26:[2,49],33:[2,49],37:[2,49],38:[2,49],39:[2,49],40:[2,49],41:[2,49],44:[2,49],45:[2,49],46:[2,49],47:[2,49]},{20:[1,83]},{20:[2,53],33:[1,84],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]},{18:[1,27],19:71,20:[1,85],30:[1,46],38:[1,21],42:22,43:23,48:86,49:[1,24],50:[1,25],51:[1,26]},{18:[2,59],20:[2,59],24:[2,59],26:[2,59],33:[2,59],37:[2,59],38:[2,59],39:[2,59],40:[2,59],41:[2,59],44:[2,59],45:[2,59],46:[2,59],47:[2,59]},{5:[2,20],16:[2,20],17:[2,20],18:[2,20],21:[2,20],26:[2,20],27:[2,20],30:[2,20],31:[2,20],34:[2,20],38:[2,20],49:[2,20],50:[2,20],51:[2,20]},{29:[2,24],32:[2,24],33:[2,24]},{8:87,18:[1,27],19:13,26:[1,14],30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{15:[1,88]},{20:[1,89],33:[1,90]},{20:[2,29],33:[2,29]},{20:[1,91],30:[1,79],36:92},{14:93,15:[1,6]},{18:[2,48],20:[2,48],24:[2,48],26:[2,48],33:[2,48],37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],44:[2,48],45:[2,48],46:[2,48],47:[2,48]},{18:[2,50],20:[2,50],24:[2,50],26:[2,50],33:[2,50],37:[2,50],38:[2,50],39:[2,50],40:[2,50],41:[2,50],44:[2,50],45:[2,50],46:[2,50],47:[2,50]},{18:[1,27],19:71,30:[1,46],38:[1,21],42:22,43:23,48:94,49:[1,24],50:[1,25],51:[1,26]},{18:[2,51],20:[2,51],24:[2,51],26:[2,51],33:[2,51],37:[2,51],38:[2,51],39:[2,51],40:[2,51],41:[2,51],44:[2,51],45:[2,51],46:[2,51],47:[2,51]},{20:[1,95]},{5:[2,22],16:[2,22],17:[2,22],18:[2,22],21:[2,22],26:[2,22],27:[2,22],30:[2,22],31:[2,22],34:[2,22],38:[2,22],49:[2,22],50:[2,22],51:[2,22]},{6:97,7:5,8:7,9:8,10:9,11:10,12:11,13:12,14:98,15:[1,6],17:[1,19],18:[1,27],19:13,21:[1,20],22:99,23:[1,100],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],35:96,38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{15:[1,101]},{30:[1,102]},{15:[1,103]},{20:[1,104],33:[1,90]},{5:[2,14],16:[2,14],17:[2,14],18:[2,14],21:[2,14],26:[2,14],27:[2,14],30:[2,14],31:[2,14],34:[2,14],38:[2,14],49:[2,14],50:[2,14],51:[2,14]},{20:[2,54]},{18:[2,52],20:[2,52],24:[2,52],26:[2,52],33:[2,52],37:[2,52],38:[2,52],39:[2,52],40:[2,52],41:[2,52],44:[2,52],45:[2,52],46:[2,52],47:[2,52]},{16:[1,105]},{7:31,8:7,9:8,10:9,11:10,12:11,13:12,16:[2,31],17:[1,19],18:[1,27],19:13,21:[1,20],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{16:[2,32]},{16:[2,33]},{8:106,16:[2,17],18:[1,27],19:13,24:[1,107],26:[1,14],30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{6:97,7:5,8:7,9:8,10:9,11:10,12:11,13:12,14:98,15:[1,6],17:[1,19],18:[1,27],19:13,21:[1,20],22:99,23:[1,100],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],35:108,38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{20:[2,30],33:[2,30]},{6:97,7:5,8:7,9:8,10:9,11:10,12:11,13:12,14:98,15:[1,6],17:[1,19],18:[1,27],19:13,21:[1,20],22:99,23:[1,100],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],35:109,38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{15:[1,110]},{5:[2,25],16:[2,25],17:[2,25],18:[2,25],21:[2,25],26:[2,25],27:[2,25],30:[2,25],31:[2,25],34:[2,25],38:[2,25],49:[2,25],50:[2,25],51:[2,25]},{16:[2,16]},{16:[2,19],18:[1,27],19:112,25:111,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{16:[1,113]},{16:[1,114]},{6:97,7:5,8:7,9:8,10:9,11:10,12:11,13:12,14:98,15:[1,6],17:[1,19],18:[1,27],19:13,21:[1,20],22:99,23:[1,100],26:[1,14],27:[1,15],30:[1,16],31:[1,17],34:[1,18],35:115,38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{26:[1,116],33:[1,117]},{26:[2,34],33:[2,34],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]},{5:[2,26],16:[2,26],17:[2,26],18:[2,26],21:[2,26],26:[2,26],27:[2,26],30:[2,26],31:[2,26],34:[2,26],38:[2,26],49:[2,26],50:[2,26],51:[2,26]},{5:[2,27],16:[2,27],17:[2,27],18:[2,27],21:[2,27],26:[2,27],27:[2,27],30:[2,27],31:[2,27],34:[2,27],38:[2,27],49:[2,27],50:[2,27],51:[2,27]},{16:[1,118]},{16:[2,18]},{18:[1,27],19:119,30:[1,46],38:[1,21],42:22,43:23,49:[1,24],50:[1,25],51:[1,26]},{5:[2,28],16:[2,28],17:[2,28],18:[2,28],21:[2,28],26:[2,28],27:[2,28],30:[2,28],31:[2,28],34:[2,28],38:[2,28],49:[2,28],50:[2,28],51:[2,28]},{26:[2,35],33:[2,35],37:[1,34],38:[1,35],39:[1,36],40:[1,37],41:[1,38]}],
defaultActions: {28:[2,1],30:[2,2],94:[2,54],98:[2,32],99:[2,33],106:[2,16],116:[2,18]},
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
case 1:return 49
break;
case 2:return 39
break;
case 3:return 40
break;
case 4:return 38
break;
case 5:return 37
break;
case 6:return 41
break;
case 7:return 24
break;
case 8:return '%'
break;
case 9:return 18
break;
case 10:return 20
break;
case 11:return 50
break;
case 12:return 51
break;
case 13:return 26
break;
case 14:return 44
break;
case 15:return 33
break;
case 16:return 46
break;
case 17:return 47
break;
case 18:return 15
break;
case 19:return 16
break;
case 20:return 29
break;
case 21:return 31
break;
case 22:return 32
break;
case 23:return 21
break;
case 24:return 34
break;
case 25:return 27
break;
case 26:return 17
break;
case 27:return 45
break;
case 28:return 23
break;
case 29:return 30
break;
case 30:return 5
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^!/,/^%/,/^\(/,/^\)/,/^".*"/,/^\[.+(,.)*\]/,/^;/,/^\./,/^,/,/^\[/,/^\]/,/^\{/,/^\}/,/^=/,/^</,/^>/,/^:-/,/^def\b/,/^var\b/,/^if\b/,/^::/,/^return\b/,/^[a-zA-Z_]+([0-9a-zA-Z_])*/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":true}};return lexer;})()
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