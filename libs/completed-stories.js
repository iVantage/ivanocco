module.exports = function(program, release, cb) {
  'use strict';

  var async = require('async'),
      format = require('util').format,
      Trello = require('node-trello');

  var conf = require('../conf/trello.js')(),
      trello = new Trello(program.apiKey, program.token),
      trelloUtils = require('../libs/trello-utils.js');

  var boardId = program.boardId,
      doneList = conf.doneList.toLowerCase();

  /**
   * Returns a list of "done" stories in the board.
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  var getStoriesForBoard = function(listId, cb) {
    trello.get(format('/1/boards/%s/cards', boardId), function(err, data) {
      if(err) {return cb(err);}
      var doneStories = data.filter(function(item) {
        return item.idList.toLowerCase() === listId;
      })
      return cb(null, doneStories);
    });
  };

  async.waterfall([
    trelloUtils.getBoardListIdByName(trello, boardId, doneList),
    getStoriesForBoard
  ], function(err, result) {
    release.stories = result;
    return err ? cb(err) : cb(null, result);
  });

};
