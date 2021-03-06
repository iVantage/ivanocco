var format = require('util').format;

module.exports = {

  /**
   * Returns the id of list name in the given board.
   * @param  {[type]}
   * @return {[type]}
   */
  getBoardListIdByName: function(t, boardId, listName, cb) {
    return function(cb) {
      var listNameLowerCase = listName.toLowerCase();
      t.get(format('/1/boards/%s/lists', boardId), function(err, lists) {
        if(err) {return cb(err);}
        var ix;
        for(ix = lists.length; ix--;) {
          if(lists[ix].name.toLowerCase() === listNameLowerCase) {
            return cb(null, lists[ix].id);
          }
        }
        cb(new Error(format('Could not find a list %s in board %s.', listNameLowerCase, boardId)));
      });
    };
  }

};
