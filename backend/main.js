var http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('{askjasfaskl aslk f}');
    
    //hell;o
}).listen();