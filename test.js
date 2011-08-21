var compiler = require('./compiler');

var program = compiler.compile('while (c < 10) { }');
console.log(program);
