module.exports = function(trelloData, releaseData, cb) {
  'use strict';

  var fs = require('fs'),
      path = require('path'),
      async = require('async');


  var trelloDataToFile = function(cb) {
    fs.writeFileSync('data/trello.json', JSON.stringify(trelloData));
    cb(null);
  };

  var releaseDataToFile = function(cb) {
    fs.writeFileSync('data/release.json', JSON.stringify(releaseData));
    cb(null);
  };

  async.series([
    trelloDataToFile,
    releaseDataToFile
  ], function(err) {
    if(err) {return cb(err);}
    return cb(null);
  })

}
