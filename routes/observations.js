const express = require('express');
const inatjs = require('../lib/inaturalistjs');
const router = express.Router();
// const knex = require('../db/knex');
// const models = require('../db/models');
var url = 'https://www.inaturalist.org/observations.json';
var natURL = 'http://api.inaturalist.org/'
var token = 'https://www.inaturalist.org/users/api_token'

var payload = {
    client_id: process.env.client_id,
    client_secret: process.env.client_id,
    grant_type: 'password',
  };

router.get('/', (req, res, next) => {
  inatjs.observations.fetch({ place_id: 1 }).then( rsp => {
    res.json(rsp)
  }).catch(function(error) {
    console.log(error);
  })
});

router.put('/', (req, res, next) => {
  var animal = req.body;
  // models.bikes().where({ bID: bicycle.bID }).update({
  //   name: bicycle.name,
  //   manu: bicycle.manu,
  //   year: bicycle.year,
  //   model: bicycle.model
  // }).then()
  // .catch(function (error) {
  //   console.log(error);
  // });
});

module.exports = router;
