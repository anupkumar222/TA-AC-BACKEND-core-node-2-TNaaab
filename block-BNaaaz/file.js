var http = require('http');
var fs = require('fs')

var server = http.createServer((req,res)=>{
    console.log(req.method);
    fs.createReadStream('./readme.txt').pipe(res)
})

server.listen(3000);