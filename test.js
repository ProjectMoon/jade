var compiler = require('./compiler');

var program = compiler.compile('x = a!(); y = b!();');
console.log(program);
