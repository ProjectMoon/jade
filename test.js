var compiler = require('./compiler');

var program = compiler.compile('var x = a!(); var y = b!();');
console.log(program);
