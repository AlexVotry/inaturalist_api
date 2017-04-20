const express = require('express');
const path = require('path');

const auth = require('basic-auth');
const dotenv = require('dotenv');

// const observations = require('./observations/observations.route');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

site = 'https://www.inaturalist.org';

app_id = process.env.MY_ID;
app_secret = process.env.MY_SECRET;
redirect_uri = 'localhost:3000';

url = `${site}/oauth/authorize?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code`;

// app.use('/observations', observations);
module.exports = app;
