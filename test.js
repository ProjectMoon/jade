var compiler = require('./compiler');

var program = compiler.compile('var a = function!(a) {};');
console.log(program);
