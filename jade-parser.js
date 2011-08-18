/* Jison generated parser */
var jadeParser = (function(){

	var ASTNode = module.exports.ASTNode = function(root, left, right) {
		this.root = root;
		this.left = left;
		this.right = right;
	}

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"block_list":4,"EOF":5,"statement_list":6,"statement":7,"expression_statement":8,"init_variable":9,"assign_variable":10,"function_declaration":11,"if_statement":12,"block":13,"{":14,"}":15,"IF":16,"(":17,"e":18,")":19,"return_statement":20,"RETURN":21,"!":22,"expression_list":23,";":24,"VAR":25,"ident_list":26,"=":27,"IDENT":28,"<":29,">":30,",":31,"DEF":32,"function_body":33,"function_formal_parameters":34,"+":35,"-":36,"*":37,"/":38,"^":39,"postfix_expression":40,"atom":41,".":42,"[":43,"]":44,"function_call_parameters":45,"NUMBER":46,"STRING_LITERAL":47,"LIST_LITERAL":48,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"{",15:"}",16:"IF",17:"(",19:")",21:"RETURN",22:"!",24:";",25:"VAR",27:"=",28:"IDENT",29:"<",30:">",31:",",32:"DEF",35:"+",36:"-",37:"*",38:"/",39:"^",42:".",43:"[",44:"]",46:"NUMBER",47:"STRING_LITERAL",48:"LIST_LITERAL"},
productions_: [0,[3,2],[3,2],[7,1],[7,1],[7,1],[7,1],[7,1],[6,1],[6,2],[13,3],[4,1],[4,2],[12,5],[20,2],[20,1],[20,4],[20,2],[9,4],[10,3],[10,5],[26,1],[26,3],[11,7],[11,8],[11,8],[11,9],[34,1],[34,3],[33,1],[33,1],[33,1],[23,1],[23,3],[8,2],[8,1],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,1],[40,1],[40,3],[40,4],[40,3],[40,4],[40,4],[40,5],[45,1],[45,3],[41,1],[41,1],[41,1],[41,1],[41,3]],
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
			this.$ = new ASTNode('Return', $$[$0], null);
		
break;
case 15:
			this.$ = new ASTNode('Return', null, null);
		
break;
case 16:
			this.$ = new ASTNode('AsyncReturn', { values: $$[$0-1] }, null);
		
break;
case 17:
			this.$ = new ASTNode('AsyncReturn', { values: null }, null);
		
break;
case 18:
			this.$ = new ASTNode('InitVariable', { idents: $$[$0-2] }, $$[$0]);
		
break;
case 19:
			this.$ = new ASTNode('AssignVariable', { idents: [ $$[$0-2] ] }, $$[$0]);
		
break;
case 20:
			this.$ = new ASTNode('AssignVariable', { idents: $$[$0-3] }, $$[$0]);
		
break;
case 21: this.$ = [ $$[$0] ]; 
break;
case 22:
			if ($$[$0-2] instanceof Array) {
				$$[$0-2].push($$[$0]);
				this.$ = $$[$0-2];
			}
			else {
				this.$ = [ $$[$0-2], $$[$0] ];
			}
		
break;
case 23:
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-5], funcInfo);
		
break;
case 24:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('FunctionDef', $$[$0-6], funcInfo);
		
break;
case 25:
			var funcInfo = { formalParams: null, body: $$[$0-1] };
			this.$ = new ASTNode('AsyncFunctionDef', $$[$0-6], funcInfo);
		
break;
case 26:
			var funcInfo = { formalParams: $$[$0-4], body: $$[$0-1] };
			this.$ = new ASTNode('AsyncFunctionDef', $$[$0-7], funcInfo);
		
break;
case 27: this.$ = $$[$0]; 
break;
case 28: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32:
			this.$ = [ $$[$0] ];
		
break;
case 33:
			if ($$[$0-2] instanceof Array) {
				$$[$0-2].push($$[$0]);
				this.$ = $$[$0-2];
			}
			else {
				this.$ = [ $$[$0-2], $$[$0] ];
			}
		
break;
case 34: 
			this.$ = new ASTNode('Expression', $$[$0-1], null);
		
break;
case 35: this.$ = new ASTNode('Expression', null, null); 
break;
case 36:
			this.$ = new ASTNode('+', $$[$0-2], $$[$0]);
		
break;
case 37:
			this.$ = new ASTNode('-', $$[$0-2], $$[$0]);
		
break;
case 38:
			this.$ = new ASTNode('*', $$[$0-2], $$[$0]);
		
break;
case 39:
			this.$ = new ASTNode('/', $$[$0-2], $$[$0]);
		
break;
case 40:
			this.$ = new ASTNode('^', $$[$0-2], $$[$0]);
		
break;
case 41:
			this.$ = new ASTNode('*', -1, $$[$0]);
		
break;
case 43: this.$ = $$[$0]; 
break;
case 44: this.$ = new ASTNode('Property', $$[$0-2], $$[$0]); 
break;
case 45: this.$ = new ASTNode('Array', $$[$0-3], $$[$0-1]); 
break;
case 46:
			this.$ = new ASTNode('FunctionCall', $$[$0-2], null);
		
break;
case 47:
			this.$ = new ASTNode('FunctionCall', $$[$0-3], $$[$0-1]);
		
break;
case 48:
			this.$ = new ASTNode('AsyncCall', $$[$0-3], null);
		
break;
case 49:
			this.$ = new ASTNode('AsyncCall', $$[$0-4], $$[$0-2]);
		
break;
case 50: this.$ = $$[$0] 
break;
case 51: this.$ = $$[$0-2] + ',' + $$[$0]; 
break;
case 52:
			this.$ = Number($$[$0]);
		
break;
case 53:
			this.$ = $$[$0];
		
break;
case 54:
			this.$ = yytext;
		
break;
case 55:
			this.$ = yytext;
		
break;
case 56: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:5,8:7,9:8,10:9,11:10,12:11,13:4,14:[1,6],16:[1,18],17:[1,25],18:12,24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{1:[3]},{5:[1,26],13:27,14:[1,6]},{5:[1,28],7:29,8:7,9:8,10:9,11:10,12:11,16:[1,18],17:[1,25],18:12,24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{5:[2,11],14:[2,11]},{5:[2,8],15:[2,8],16:[2,8],17:[2,8],24:[2,8],25:[2,8],28:[2,8],29:[2,8],32:[2,8],36:[2,8],46:[2,8],47:[2,8],48:[2,8]},{6:30,7:5,8:7,9:8,10:9,11:10,12:11,16:[1,18],17:[1,25],18:12,24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{5:[2,3],15:[2,3],16:[2,3],17:[2,3],24:[2,3],25:[2,3],28:[2,3],29:[2,3],32:[2,3],36:[2,3],46:[2,3],47:[2,3],48:[2,3]},{5:[2,4],15:[2,4],16:[2,4],17:[2,4],24:[2,4],25:[2,4],28:[2,4],29:[2,4],32:[2,4],36:[2,4],46:[2,4],47:[2,4],48:[2,4]},{5:[2,5],15:[2,5],16:[2,5],17:[2,5],24:[2,5],25:[2,5],28:[2,5],29:[2,5],32:[2,5],36:[2,5],46:[2,5],47:[2,5],48:[2,5]},{5:[2,6],15:[2,6],16:[2,6],17:[2,6],24:[2,6],25:[2,6],28:[2,6],29:[2,6],32:[2,6],36:[2,6],46:[2,6],47:[2,6],48:[2,6]},{5:[2,7],15:[2,7],16:[2,7],17:[2,7],24:[2,7],25:[2,7],28:[2,7],29:[2,7],32:[2,7],36:[2,7],46:[2,7],47:[2,7],48:[2,7]},{24:[1,31],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]},{5:[2,35],15:[2,35],16:[2,35],17:[2,35],24:[2,35],25:[2,35],28:[2,35],29:[2,35],32:[2,35],36:[2,35],46:[2,35],47:[2,35],48:[2,35]},{26:37,28:[1,38]},{17:[2,53],22:[2,53],24:[2,53],27:[1,39],35:[2,53],36:[2,53],37:[2,53],38:[2,53],39:[2,53],42:[2,53],43:[2,53]},{26:40,28:[1,38]},{28:[1,41]},{17:[1,42]},{17:[1,25],18:43,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,47],19:[2,42],22:[1,48],24:[2,42],31:[2,42],35:[2,42],36:[2,42],37:[2,42],38:[2,42],39:[2,42],42:[1,45],43:[1,46],44:[2,42]},{17:[2,43],19:[2,43],22:[2,43],24:[2,43],31:[2,43],35:[2,43],36:[2,43],37:[2,43],38:[2,43],39:[2,43],42:[2,43],43:[2,43],44:[2,43]},{17:[2,52],19:[2,52],22:[2,52],24:[2,52],31:[2,52],35:[2,52],36:[2,52],37:[2,52],38:[2,52],39:[2,52],42:[2,52],43:[2,52],44:[2,52]},{17:[2,54],19:[2,54],22:[2,54],24:[2,54],31:[2,54],35:[2,54],36:[2,54],37:[2,54],38:[2,54],39:[2,54],42:[2,54],43:[2,54],44:[2,54]},{17:[2,55],19:[2,55],22:[2,55],24:[2,55],31:[2,55],35:[2,55],36:[2,55],37:[2,55],38:[2,55],39:[2,55],42:[2,55],43:[2,55],44:[2,55]},{17:[1,25],18:49,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{1:[2,1]},{5:[2,12],14:[2,12]},{1:[2,2]},{5:[2,9],15:[2,9],16:[2,9],17:[2,9],24:[2,9],25:[2,9],28:[2,9],29:[2,9],32:[2,9],36:[2,9],46:[2,9],47:[2,9],48:[2,9]},{7:29,8:7,9:8,10:9,11:10,12:11,15:[1,50],16:[1,18],17:[1,25],18:12,24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{5:[2,34],15:[2,34],16:[2,34],17:[2,34],24:[2,34],25:[2,34],28:[2,34],29:[2,34],32:[2,34],36:[2,34],46:[2,34],47:[2,34],48:[2,34]},{17:[1,25],18:51,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,25],18:52,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,25],18:53,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,25],18:54,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,25],18:55,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{27:[1,56],31:[1,57]},{27:[2,21],30:[2,21],31:[2,21]},{8:58,17:[1,25],18:12,24:[1,13],28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{30:[1,59],31:[1,57]},{17:[1,60],22:[1,61]},{17:[1,25],18:62,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{19:[2,41],24:[2,41],31:[2,41],35:[2,41],36:[2,41],37:[2,41],38:[2,41],39:[2,41],44:[2,41]},{17:[2,53],19:[2,53],22:[2,53],24:[2,53],31:[2,53],35:[2,53],36:[2,53],37:[2,53],38:[2,53],39:[2,53],42:[2,53],43:[2,53],44:[2,53]},{28:[1,63]},{17:[1,25],18:64,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{17:[1,25],18:67,19:[1,65],28:[1,44],36:[1,19],40:20,41:21,45:66,46:[1,22],47:[1,23],48:[1,24]},{17:[1,68]},{19:[1,69],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],17:[2,10],24:[2,10],25:[2,10],28:[2,10],29:[2,10],32:[2,10],36:[2,10],46:[2,10],47:[2,10],48:[2,10]},{19:[2,36],24:[2,36],31:[2,36],35:[2,36],36:[2,36],37:[1,34],38:[1,35],39:[1,36],44:[2,36]},{19:[2,37],24:[2,37],31:[2,37],35:[2,37],36:[2,37],37:[1,34],38:[1,35],39:[1,36],44:[2,37]},{19:[2,38],24:[2,38],31:[2,38],35:[2,38],36:[2,38],37:[2,38],38:[2,38],39:[1,36],44:[2,38]},{19:[2,39],24:[2,39],31:[2,39],35:[2,39],36:[2,39],37:[2,39],38:[2,39],39:[1,36],44:[2,39]},{19:[2,40],24:[2,40],31:[2,40],35:[2,40],36:[2,40],37:[2,40],38:[2,40],39:[2,40],44:[2,40]},{8:70,17:[1,25],18:12,24:[1,13],28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{28:[1,71]},{5:[2,19],15:[2,19],16:[2,19],17:[2,19],24:[2,19],25:[2,19],28:[2,19],29:[2,19],32:[2,19],36:[2,19],46:[2,19],47:[2,19],48:[2,19]},{27:[1,72]},{19:[1,73],28:[1,75],34:74},{17:[1,76]},{19:[1,77],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]},{17:[2,44],19:[2,44],22:[2,44],24:[2,44],31:[2,44],35:[2,44],36:[2,44],37:[2,44],38:[2,44],39:[2,44],42:[2,44],43:[2,44],44:[2,44]},{35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36],44:[1,78]},{17:[2,46],19:[2,46],22:[2,46],24:[2,46],31:[2,46],35:[2,46],36:[2,46],37:[2,46],38:[2,46],39:[2,46],42:[2,46],43:[2,46],44:[2,46]},{19:[1,79]},{19:[2,50],31:[1,80],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]},{17:[1,25],18:67,19:[1,81],28:[1,44],36:[1,19],40:20,41:21,45:82,46:[1,22],47:[1,23],48:[1,24]},{17:[2,56],19:[2,56],22:[2,56],24:[2,56],31:[2,56],35:[2,56],36:[2,56],37:[2,56],38:[2,56],39:[2,56],42:[2,56],43:[2,56],44:[2,56]},{5:[2,18],15:[2,18],16:[2,18],17:[2,18],24:[2,18],25:[2,18],28:[2,18],29:[2,18],32:[2,18],36:[2,18],46:[2,18],47:[2,18],48:[2,18]},{27:[2,22],30:[2,22],31:[2,22]},{8:83,17:[1,25],18:12,24:[1,13],28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{14:[1,84]},{19:[1,85],31:[1,86]},{19:[2,27],31:[2,27]},{19:[1,87],28:[1,75],34:88},{13:89,14:[1,6]},{17:[2,45],19:[2,45],22:[2,45],24:[2,45],31:[2,45],35:[2,45],36:[2,45],37:[2,45],38:[2,45],39:[2,45],42:[2,45],43:[2,45],44:[2,45]},{17:[2,47],19:[2,47],22:[2,47],24:[2,47],31:[2,47],35:[2,47],36:[2,47],37:[2,47],38:[2,47],39:[2,47],42:[2,47],43:[2,47],44:[2,47]},{17:[1,25],18:67,28:[1,44],36:[1,19],40:20,41:21,45:90,46:[1,22],47:[1,23],48:[1,24]},{17:[2,48],19:[2,48],22:[2,48],24:[2,48],31:[2,48],35:[2,48],36:[2,48],37:[2,48],38:[2,48],39:[2,48],42:[2,48],43:[2,48],44:[2,48]},{19:[1,91]},{5:[2,20],15:[2,20],16:[2,20],17:[2,20],24:[2,20],25:[2,20],28:[2,20],29:[2,20],32:[2,20],36:[2,20],46:[2,20],47:[2,20],48:[2,20]},{6:93,7:5,8:7,9:8,10:9,11:10,12:11,13:94,14:[1,6],16:[1,18],17:[1,25],18:12,20:95,21:[1,96],24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],33:92,36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{14:[1,97]},{28:[1,98]},{14:[1,99]},{19:[1,100],31:[1,86]},{5:[2,13],15:[2,13],16:[2,13],17:[2,13],24:[2,13],25:[2,13],28:[2,13],29:[2,13],32:[2,13],36:[2,13],46:[2,13],47:[2,13],48:[2,13]},{19:[2,51]},{17:[2,49],19:[2,49],22:[2,49],24:[2,49],31:[2,49],35:[2,49],36:[2,49],37:[2,49],38:[2,49],39:[2,49],42:[2,49],43:[2,49],44:[2,49]},{15:[1,101]},{7:29,8:7,9:8,10:9,11:10,12:11,15:[2,29],16:[1,18],17:[1,25],18:12,24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{15:[2,30]},{15:[2,31]},{8:102,15:[2,15],17:[1,25],18:12,22:[1,103],24:[1,13],28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{6:93,7:5,8:7,9:8,10:9,11:10,12:11,13:94,14:[1,6],16:[1,18],17:[1,25],18:12,20:95,21:[1,96],24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],33:104,36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{19:[2,28],31:[2,28]},{6:93,7:5,8:7,9:8,10:9,11:10,12:11,13:94,14:[1,6],16:[1,18],17:[1,25],18:12,20:95,21:[1,96],24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],33:105,36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{14:[1,106]},{5:[2,23],15:[2,23],16:[2,23],17:[2,23],24:[2,23],25:[2,23],28:[2,23],29:[2,23],32:[2,23],36:[2,23],46:[2,23],47:[2,23],48:[2,23]},{15:[2,14]},{15:[2,17],17:[1,25],18:108,23:107,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{15:[1,109]},{15:[1,110]},{6:93,7:5,8:7,9:8,10:9,11:10,12:11,13:94,14:[1,6],16:[1,18],17:[1,25],18:12,20:95,21:[1,96],24:[1,13],25:[1,14],28:[1,15],29:[1,16],32:[1,17],33:111,36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{24:[1,112],31:[1,113]},{24:[2,32],31:[2,32],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]},{5:[2,24],15:[2,24],16:[2,24],17:[2,24],24:[2,24],25:[2,24],28:[2,24],29:[2,24],32:[2,24],36:[2,24],46:[2,24],47:[2,24],48:[2,24]},{5:[2,25],15:[2,25],16:[2,25],17:[2,25],24:[2,25],25:[2,25],28:[2,25],29:[2,25],32:[2,25],36:[2,25],46:[2,25],47:[2,25],48:[2,25]},{15:[1,114]},{15:[2,16]},{17:[1,25],18:115,28:[1,44],36:[1,19],40:20,41:21,46:[1,22],47:[1,23],48:[1,24]},{5:[2,26],15:[2,26],16:[2,26],17:[2,26],24:[2,26],25:[2,26],28:[2,26],29:[2,26],32:[2,26],36:[2,26],46:[2,26],47:[2,26],48:[2,26]},{24:[2,33],31:[2,33],35:[1,32],36:[1,33],37:[1,34],38:[1,35],39:[1,36]}],
defaultActions: {26:[2,1],28:[2,2],90:[2,51],94:[2,30],95:[2,31],102:[2,14],112:[2,16]},
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
case 1:return 46
break;
case 2:return 37
break;
case 3:return 38
break;
case 4:return 36
break;
case 5:return 35
break;
case 6:return 39
break;
case 7:return 22
break;
case 8:return '%'
break;
case 9:return 17
break;
case 10:return 19
break;
case 11:return 47
break;
case 12:return 48
break;
case 13:return 24
break;
case 14:return 42
break;
case 15:return 31
break;
case 16:return 43
break;
case 17:return 44
break;
case 18:return 14
break;
case 19:return 15
break;
case 20:return 27
break;
case 21:return 29
break;
case 22:return 30
break;
case 23:return 32
break;
case 24:return 25
break;
case 25:return 16
break;
case 26:return 21
break;
case 27:return 28
break;
case 28:return 5
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^!/,/^%/,/^\(/,/^\)/,/^".*"/,/^\[.+(,.)*\]/,/^;/,/^\./,/^,/,/^\[/,/^\]/,/^\{/,/^\}/,/^=/,/^</,/^>/,/^def\b/,/^var\b/,/^if\b/,/^return\b/,/^[a-zA-Z_]+([0-9a-zA-Z_])*/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"inclusive":true}};return lexer;})()
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