var compiler = require('./compiler');

var program = compiler.compile('<x, y> = a!();');
console.log(program);
