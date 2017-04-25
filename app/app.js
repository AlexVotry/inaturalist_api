const express = require('express');
const knex = require('../db/knex');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const auth = require('./auth/authenticate');
const routes = require('./routes/index');
const signup = require('./routes/signup.route');
const login = require('./routes/login.route');
const favorites = require('./routes/fav.route');
const methodOverride = require('method-override');
const session = require('cookie-session');
const models = require('../db/model');
require('dotenv').load();

const app = express();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use('/app/v1/signup', signup);
app.use('/app/v1/login', login);

app.use('/app/v1/favorites', favorites);

module.exports = app;

// const site = 'https://www.inaturalist.org/oauth/authorize';
// const app_id = process.env.app_id;
// const app_secret = process.env.app_secret;
// const redirect_uri = process.env.HOST;

//
// const payload = {
//   client_id: app_id,
//   client_secret: app_secret,
//   code: process.env.auth_code,
//   redirect_uri: redirect_uri,
//   grant_type: "authorization_code"
// };
// app.use(site, (request, response) =>{
    // response
    // .send(payload);
// });
