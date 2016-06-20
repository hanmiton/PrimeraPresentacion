var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var ingenieros = require('./public/ingenieros.json');
var convenios = require('./public/convenios.json');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/ingenieros', function (req, res) {
  var type = req.query.type;

  if (type) {
    var results = ingenieros.filter(function (ingeniero) {
      return ingeniero.type.some(function (t) {
        return t.toLowerCase() === type;
      });
    });

    res.send(results);
  } else {
    res.send(ingenieros);
  }
});

app.get('/api/ingenieros/:name', function (req, res) {
  var name = req.params.name;
  var results = ingenieros.filter(function (ingeniero) {
    return ingeniero.name.toLowerCase() === name;
  });

  if (results.length > 0) {
    res.send(results[0]);
  } else {
    res.status(404).end();
  }
});

app.get('/api/convenios', function (req, res) {
  var type = req.query.type;

  if (type) {
    var results = convenios.filter(function (convenio) {
      return convenio.type.some(function (t) {
        return t.toLowerCase() === type;
      });
    });

    res.send(results);
  } else {
    res.send(convenios);
  }
});

app.get('/api/convenios/:name', function (req, res) {
  var name = req.params.name;
  var results = convenios.filter(function (convenio) {
    return convenio.name.toLowerCase() === name;
  });

  if (results.length > 0) {
    res.send(results[0]);
  } else {
    res.status(404).end();
  }
});


app.listen(8080);