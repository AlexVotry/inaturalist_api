var express = require('express');
var path = require('path');
var auth = require('basic-auth');
var dotenv = require('dotenv');
var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});




// url = `${site}/oauth/authorize?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code`;

// app.use('/observations', observations);
module.exports = app;
