var path = require('path');

var absolutePath = __dirname;
console.log(absolutePath);

var appPath = path.join(__dirname, 'app.js');

var relativePath = "./app.js";

console.log(appPath);