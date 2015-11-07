#!/usr/bin/node
var http = require('http');
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.end('<html><head><title>First Test</title></head><body><h1>The Carl-Ender</h1></body></html>');
}).listen(8000, '127.0.0.1');
