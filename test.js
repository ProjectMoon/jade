var compiler = require('./compiler');

var program = compiler.compile('x!();y!();:-');
console.log(program);
