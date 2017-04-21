var express = require('express');
var path = require('path');
var auth = require('basic-auth');
var login = require('../routes/login');
var observations = require('../routes/observations');
// var jwt = require('jsonwebtoken');
var app = express();
require('dotenv').load();

app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

app.use('/observations',observations);

// url = `${site}/oauth/authorize?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code`;

// app.use('/observations', observations);
module.exports = app;
