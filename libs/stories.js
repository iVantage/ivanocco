module.exports = function(program, cb) {
  'use strict';

  var request = require('request')
    , async = require('async')
    ,_after = require('lodash.after')
    , format = require('util').format
    , Trello = require('node-trello');

  var trello = new Trello(program.apiKey, program.token)
    , conf = require('../conf/trello.js')()
    , trelloUtils = require('../libs/trello-utils.js');


  var boardId = '5XAuS2Mf';
  var doneList = conf.doneList;

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
        return item.idList === listId;
      })
      return cb(null, doneStories);
    });
  }


  async.waterfall([
    trelloUtils.getBoardListIdByName(trello, boardId, doneList),
    getStoriesForBoard
  ], function(err, result) {
    return err ? cb(err) : cb(null, result);
  })

};
