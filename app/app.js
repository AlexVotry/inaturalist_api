var express = require('express');
var path = require('path');

var auth = require('basic-auth');
var dotenv = require('dotenv');

// var observations = require('./observations/observations.route');

var app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

site = 'https://www.inaturalist.org';

app_id = process.env.MY_ID;
app_secret = process.env.MY_SECRET;
redirect_uri = 'localhost:3000';

// url = `${site}/oauth/authorize?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code`;

// app.use('/observations', observations);
module.exports = app;
