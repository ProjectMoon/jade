var compiler = require('./compiler');

var program = compiler.compile('function z() { x; } x();');
console.log(program);
