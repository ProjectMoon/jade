var compiler = require('./compiler');

var program = compiler.compile('var x, y = a!(), z;');
console.log(program);
