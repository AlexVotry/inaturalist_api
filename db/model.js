const knex = require('./knex');

module.exports = {

  findGamer: function findGamer(name) {
    return knex('gamers').where({ 'gamers.username': name })
  },

  createGamer: function createGamer(credentials) {
    console.log('un: ', credentials.username, 'pw:', credentials.password);
    return knex('gamers').insert({
      username: credentials.username,
      password: credentials.password
    });
  },

  allGamers: function allGamers() {
    return knex('gamers');
  }

};
