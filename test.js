var compiler = require('./compiler');

var program = compiler.compile('var x = { a };');
console.log(program);
