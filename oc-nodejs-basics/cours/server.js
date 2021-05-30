var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);

  console.log('pathname', pathname);
  console.log('params', params);
  console.log('prenom', params.prenom);

  res.writeHead(200, {"Content-Type": "text/plain"});

  if ('prenom' in params && 'nom' in params) {
    res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
  }
  else {
    res.write('Vous devez bien avoir un prénom et un nom, non ?');
  }

  res.end();
});

server.listen(8080);