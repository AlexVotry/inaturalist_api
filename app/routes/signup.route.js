const express = require('express');
const auth = require('../auth/authenticate');
const signup = express.Router();
const model = require('../../db/model');

signup.post('/', (request, response) => {
  let credentials = request.body.credentials;

  auth.register(credentials)
    .then(function(token) {
      console.log('token: ', token);
      response
        .status(201)
        .json({ token: token });
    }, function(error) {
      response
        .status(401)
        .json({ error: error });
    });
});

signup.get('/', (request, response) => {
  // auth.authenticateJWT(request);
  model.allGamers().select().then(list => {
    response.json(list);
  }).catch(error => {
    console.log(error);
  })
});

module.exports = signup;
