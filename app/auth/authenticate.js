'use strict';

const jwt = require('jsonwebtoken');
const model = require('../../db/model');

const _SECRET = "super";

function hasCaseInsensitiveKey(object, name) {
  for (var key in object) {
    if (key.toLowerCase() === name.toLowerCase()) return true;
  }
  return false;
}
function readCaseInsensitiveKey(object, name) {
  for (var key in object) {
    if (key.toLowerCase() === name.toLowerCase()) return object[key];
  }
}
function extractToken(request) {
  let authHeader = readCaseInsensitiveKey(request.headers, 'Authorization');

  if (!authHeader) throw new Error('missing Authorization header');
  if (!authHeader.match(/^Bearer /i)) throw new Error('bad Authorization format');

  return authHeader.slice(7);
}

function authenticateJWT(request) {
  try {
    let token = extractToken(request);
    request.token = jwt.verify(token, _SECRET);
    console.log('authenticate secet: ', request.token);
  } catch(error) {
    throw(error);
  }
}

function register(credentials) {
  return new Promise(function(resolve, reject) {

    if (!credentials.username) reject('username cannot be empty');
    if (!credentials.password) reject('password missing');

    return model.findGamer({ username: credentials.username })
      .then(function(users) {
        console.log('finduser: ', users);
        if (users.length > 0) {
          reject('duplicate user');
        } else {
          return model.createGamer(credentials)
            .then(function() {
              console.log('createUser: ', credentials);
              resolve(jwt.sign(credentials, _SECRET ));
            });
        }
      });
  });
}

function verify(credentials) {

  return new Promise(function(resolve, reject) {

    if (!credentials.username) reject('username cannot be empty');
    if (!credentials.password) reject('password missing');

    const user = new User();

    return user.findgamer({ username: credentials.username })
      .then(function(users) {
        if (users.length == 0) reject('username does not exist');

        if (users[0].password == credentials.password ) {
          resolve(jwt.sign(credentials, _SECRET ));
        } else {
          reject('user name or password is incorrect');
        }
      });
  });
}

module.exports = {
  authenticateJWT: authenticateJWT,
  register: register,
  verify: verify
};
