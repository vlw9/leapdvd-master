"use strict";

var fs = require('fs');

var read_json_file = function read_json_file() {
  var file = './data/DVDs.json';
  return fs.readFileSync(file);
};

exports.list = function () {
  return JSON.parse(read_json_file());
};

exports.calculate_price = function (tax) {
  var json_result = JSON.parse(read_json_file());

  for (var i = 0; i < json_result.length; i++) {
    var new_price = (json_result[i].price * (tax + 1)).toFixed(2);
    json_result[i].price = new_price;
  }

  return json_result;
};