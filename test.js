var compiler = require('./compiler');

var program = compiler.compile('var x = { a: 1, b: function() {} };');
console.log(program);
