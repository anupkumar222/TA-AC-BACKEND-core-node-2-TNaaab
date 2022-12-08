var fs = require('fs');
var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.url === '/form' && req.method === 'GET') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./form.html').pipe(res);
        }

        if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.write(`<h2>${parsedData.name}</h2>`)
            res.write(`<h3>${parsedData.email}</h3>`)
            res.write(`<p>${parsedData.age}</p>`)
            res.end()
        }
    })
}

server.listen(5678, () => {
    console.log('server listening at 5678');
})