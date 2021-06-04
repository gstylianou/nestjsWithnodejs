const express = require('express');
const doAuth0 = require('../../middlewares/doAuth0');

const router = express.Router();

router.get(
  '/',  function (req, res) {
    res.send('Hello World from contracts!')
  })


  router.get(
    '/list', doAuth0, function (req, res) {
      res.send('Hello World from contracts/list!')
    })

  module.exports = router;