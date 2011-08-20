var compiler = require('./compiler');

var program = compiler.compile('if (x) { var x, y = 5; }');
console.log(program);
