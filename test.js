var compiler = require('./compiler');

var program = compiler.compile('<x, y> = a!(), z;');
console.log(program);
