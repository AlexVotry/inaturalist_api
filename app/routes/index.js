const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
  console.log('index auth');
  res.render('/', { user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.user = null;
  res.redirect('/');
});

module.exports = router;
