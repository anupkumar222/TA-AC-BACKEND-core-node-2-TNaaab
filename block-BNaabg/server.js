var http = require('http');
var server = http.createServer(handleRequest);
var fs = require('fs');
var userPath = __dirname + '/users/';
var url = require('url');

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true)

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.url === '/users' && req.method === 'POST') {
            var username = JSON.parse(store).username
            fs.open(userPath + username + '.json', 'wx', (err, fd) => {
                if(err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    fs.close(fd, () => {
                    return    res.end(`${username} created sucssefully`)
                    })
                })
            })
        }

        if(parsedUrl.pathname === '/users' && req.method === 'GET') {
            var username = parsedUrl.query.username;
            fs.readFile(userPath + username + '.json', (err, content) => {
                if(err) return res.end('user not found');
                res.setHeader('Content-Type', 'application/json');
             return   res.end(content);

            })
        }

        if(parsedUrl.pathname === '/users' && req.method === 'PUT') {
            var username = parsedUrl.query.username;
            fs.open(userPath + username + '.json', 'r+', (err, fd) => {
                if(err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if(err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if(err) return console.log(err);
                        fs.close(fd, () => {
                          return  res.end(`${username} updated sucessfully`);
                        })
                    })
                })
            })
        }

        if(parsedUrl.pathname === '/users' && req.method === 'DELETE') {
            var username = parsedUrl.query.username;
            fs.unlink(userPath + username + '.json', (err) => {
                if(err) return console.log(err);
              return  res.end(`${username} is deleted sucessfully`);
            })
        }

        res.statusCode = 404;
        res.end(`Page Not Found`);
    })
}

server.listen(3000, () => {
    console.log('server is listening on port 3k');
})