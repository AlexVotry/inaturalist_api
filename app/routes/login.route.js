const express = require('express');
const auth = require('../auth/authenticate');
const login = express.Router();
const model = require('../../db/model');

login.post('/', (request, response) => {
  let credentials = request.body.credentials;

  auth.verify(credentials).then(function(token) {
    response
      .status(201)
      .json({ token: token });
  });
});

module.exports = login;
