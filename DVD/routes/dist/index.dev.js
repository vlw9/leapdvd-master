"use strict";

var express = require('express');

var router = express.Router();

var DVDs = require('../modules/DVDs');
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/DVDs/team', function (request, response, next) {
  var result = {
    "team": 'CRAY-z',
    "membersNames": ['LOGSTER', 'VICC']
  };
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(result));
});
router.get('/DVDs/all/:location', function (request, response, next) {
  var param = request.params.location.toLowerCase();
  console.log('got into /DVDs/all/:location ' + param);
  var tax_rate = 0;

  if (param === 'durham') {
    writeHeaders(0.08);
  } else if (param === 'raleigh') {
    writeHeaders(0.075);
  } else {
    writeHeaders(404);
  }

  function writeHeaders(tax_rate) {
    if (tax_rate === 404) {
      response.sendStatus(404);
      console.log('Not a valid city');
    } else {
      var result = DVDs.calculate_price(tax_rate);
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    }
  }
});
module.exports = router;