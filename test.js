var compiler = require('./compiler');

var program = compiler.compile('x++;');
console.log(program);
