var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    var dataFormat = req.headers['content-type'];
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(dataFormat === "application/json") {
            var parsedData = JSON.parse(store);
            res.end(store);
        }

        if(dataFormat === "application/x-www-form-urlencoded") {
            qs.parse(JSON.stringify(parsedData))
        }
    })
}

server.listen(7000, () => {
    console.log('welcome to port 7k')
})