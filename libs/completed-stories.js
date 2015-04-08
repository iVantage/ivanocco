module.exports = function(program, releaseData, cb) {
  'use strict';

  var async = require('async'),
      format = require('util').format,
      Trello = require('node-trello');

  var trello = new Trello(program.apiKey, program.token),
      trelloUtils = require('../libs/trello-utils.js'),
      _after = require('lodash.after');

  var doneList = program.doneList.toLowerCase();

  var getBoardsFromCard = function(cb) {
    var card = releaseData.releaseCard;

    if(card.idChecklists.length > 0) {

      var boardIds = [];
      var done = _after(card.idChecklists.length, function(){
        cb(boardIds);
      } || function() {});

      card.idChecklists.forEach(function(checklistId) {
        async.series([function(cb) {
          trello.get(format('/1/checklists/%s', checklistId), function(err, data) {
            if(data.name === 'Sprints') {
              boardIds = data.checkItems.map(function(item){
                return item.name
                            .replace(/.*\/b\//, '')
                            .replace(/\/.*$/, '');
              });

            }
            cb(null);
          });
        }], function(err) {
          if(err) {return cb(err);}
          done();
        });
      });
    } else {
      return cb(new Error('No release boards found!'));
    }

  };

  var getStoriesForBoard = function(boardId) {
    return function(listId, cb) {
      trello.get(format('/1/boards/%s/cards', boardId), function(err, data) {
        if(err) {return cb(err);}
        var doneStories = data.filter(function(item) {
          return item.idList.toLowerCase() === listId;
        });
        return cb(null, doneStories);
      });
    };
  };


  var boardIds = getBoardsFromCard(function(boardIds) {

    var done = _after(boardIds.length, function() {
      cb(null);
    });

    boardIds.forEach(function(boardId){
      async.waterfall([
        trelloUtils.getBoardListIdByName(trello, boardId, doneList),
        getStoriesForBoard(boardId)
      ], function(err, result){
        if(err) { return cb(err); }
        result.forEach(function(story){
          if(!releaseData.stories) {
            releaseData.stories = [];
          }
          releaseData.stories.push(story);
        })
        return done();
      });
    });
  });

};
