const express = require('express');
const router = express.Router();
// const knex = require('../db/knex');
// const models = require('../db/models');
/* GET home page. */

router.get('/', (req, res, next) => {
  console.log(req.user, "REQ.USER");
  // models.dudeAndBike(req.user).select()
  // .then(data => {
  //   res.json(data);
  // }).catch(function (error) {
  //   console.log(error);
  // })
});

module.exports = router;
