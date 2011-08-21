var compiler = require('./compiler');

var program = compiler.compile('for (var x = a!(); c < 10; c++) {}');
console.log(program);
