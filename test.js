var compiler = require('./compiler');

var program = compiler.compile('var x = function z() { x; }; x();');
console.log(program);
