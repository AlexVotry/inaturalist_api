const express = require('express');
const knex = require('../db/knex');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const auth = require('./auth/authenticate');
const routes = require('./login');
const signup = require('./signup.route');
const login = require('./login.route');
const methodOverride = require('method-override');
const session = require('cookie-session');
const models = require('../db/model');
require('dotenv').load();
// const routes = require('./routes/index');
// const users = require('./routes/users');
// const bikes = require('./routes/bikes');
// const parts = require('./routes/parts');

const app = express();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  name: 'bikeRider',
  keys: [process.env.SESSION_KEY]
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use('/app/v1/signup', signup);
app.use('/app/v1/login', login);
// app.get('/', function(request, response) {
//   response.sendFile('index.html');
// });
// app.use('/', routes);
// app.use('/app/v1/signup', signup);
app.use('/app/v1/signup', function(request, response) {
  let credentials = request.body.credentials;
  let username = credentials.username;
  console.log('USERNAME: ', username);

  let user = { user: { name: username, id: 2 } };

  let payload = JSON.stringify(user);
  let encodedPayload = Buffer(payload).toString('base64');

  let token = ['header', encodedPayload, 'signature'].join('.');

  response
    .status(201)
    // .render('/', {user: username})
    .json({ token: token });
});

// app.use(function(request, response, next) {
//
//   if (request.path == '/' || request.path == '/api/v1/signup' || request.path == '/api/v1/login') next();
//
//   try {
//     auth.authenticateJWT(request);
//     next();
//   } catch(error) {
//     response.sendStatus(403);
//   }
// });

module.exports = app;

// const site = 'http://www.inaturalist.org';
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


// app.all("/api/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     return next();
// });
//
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
