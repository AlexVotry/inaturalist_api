const express = require('express');
const path = require('path');
const auth = require('basic-auth');
const dotenv = require('dotenv');
const app = express();
const login = require('./login');

const site = 'http://www.inaturalist.org';
const app_id = process.env.app_id;
const app_secret = process.env.app_secret;
const redirect_uri = process.env.HOST;

const payload = {
  client_id: app_id,
  client_secret: app_secret,
  code: process.env.auth_code,
  redirect_uri: redirect_uri,
  grant_type: "authorization_code"
};

app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

module.exports = app;
