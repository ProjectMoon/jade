var compiler = require('./compiler');

var program = compiler.compile('var x = y!(); for (var c = x; c < 10; c++) {}');
console.log(program);
