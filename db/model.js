const knex = require('./knex');


  function allGamers() {
    return knex('gamers');
  };

  function findGamer(gamer) {
    return knex('gamers').where({ 'gamers.username': gamer.username }).first();
  };

  function createGamer(credentials) {
    return knex('gamers').insert({
      username: credentials.username,
      password: credentials.password
    });
  };

  function allFav(gamer) {
    return knex('favorites').where({'favorites.username': gamer });
  };

  function createFav(fav, gamer) {
    return knex('favorites').insert({
      username: gamer.username,
      photo_id: fav.photo_id,
      picture: fav.picture,
      location: fav.location,
      uri: fav.uri,
      species: fav.species
    });
  };

  removeAnimal: function removeAnimal(animalId) {
    return knex('favorites').where({ 'favorites.id': animalId}).delete();
  };
  
  module.exports = {
    allGamers: allGamers,
    findGamer: findGamer,
    createGamer: createGamer,
    allFav: allFav,
    createFav: createFav
  }
