var compiler = require('./compiler');

var program = compiler.compile('String::toString;');
console.log(program);
