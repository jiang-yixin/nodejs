var express = require('express');
var cookieSession = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(cookieSession({
  secret: 'todotopsecret'
}))

.use(function (req, res, next) {
  if (typeof(req.session.lists) == 'undefined') {
    req.session.lists = [];
  }
  next();
})

.get('/todo', function (req, res) {
  res.render('todo.ejs', {
    lists: req.session.lists
  });
})

.get('/todo/delete/:id', function (req, res) {
  if (req.params.id !== '') {
    req.session.lists.splice(req.params.id, 1);
  }

  res.redirect('/todo');
})

.post('/todo/ajouter', urlencodedParser, function (req, res) {
  if (req.body.inputText !== '') {
    req.session.lists.push(req.body.inputText);
  }

  res.redirect('/todo');
})

.use(function(req, res){
  res.redirect('/todo');
})

.listen(8080);