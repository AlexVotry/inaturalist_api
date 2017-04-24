const express = require('express');
const favorite = express.Router();
const model = require('../../db/model');
const router = express.Router();

favorite.post('/', (request, response) => {
  let fav = request.body.favorite;
  let gamer = request.body.username;
  model.createFav(fav, gamer)
    .then((pic) => {
      response
        .status(201)
        .json({ 'success': pic });
    }, function(error) {
      response
        .status(401)
        .json({ error: error });
    });
});

favorite.get('/:id', (request, response) => {
  let gamer = request.params.id;
  model.allFav(gamer).select().then(favs => {
    response
    .status(201)
    .json(favs);
  }).catch(function (error) {
    console.log("WHOOPS: ", error);
  })
});

favorite.delete('/:id', (request, response) => {
  var animalId = request.params.id;
  console.log('delete route', animalId);
  model.removeAnimal(animalId)
  .then((deleted) => {
    response
    .status(201)
    .json(deleted);
  }).catch((error) => {
    console.log('DID NOT DELETE');
  })
});


 module.exports = favorite;
