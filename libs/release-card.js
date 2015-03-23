module.exports = function(program, release, cb) {
  'use strict';

  var async = require('async'),
      format = require('util').format,
      Trello = require('node-trello');

  var conf = require('../conf/trello.js')(),
      trello = new Trello(program.apiKey, program.token);

  var boardId = program.boardId,
      releaseCard = conf.releaseCard.toLowerCase();

  /**
   * Returns a list of "done" stories in the board.
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  var getReleaseCard = function(cb) {
    trello.get(format('/1/boards/%s/cards', boardId), function(err, data) {
      if(err) {return cb(err);}
      var card = data.filter(function(item) {
        return item.name.toLowerCase() === releaseCard;
      })
      card = card.length > 0 ? card.shift() : {};
      return cb(null, card);
    });
  };

  async.series([
     getReleaseCard
  ], function(err, result) {
    if(result && result.length >0) {
      release.releaseCard = result[0];
    }
    return err ? cb(err) : cb(null, result);
  });

};
