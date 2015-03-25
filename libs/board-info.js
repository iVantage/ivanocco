module.exports = function(program, releaseData, cb) {
  'use strict';

  var format = require('util').format,
      Trello = require('node-trello');

  var trello = new Trello(program.apiKey, program.token),
      boardId = program.boardId;

  var getBoardInfo = function(cb) {
    trello.get(format('/1/boards/%s/', boardId), function(err, data) {
      if(err) { return cb(err); }
      releaseData.boardInfo = data;
      cb(null);
    });
  };

  getBoardInfo(cb);

};
