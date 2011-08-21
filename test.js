var compiler = require('./compiler');

var program = compiler.compile('for (c in x!(a)) { console.log(c); }');
console.log(program);
