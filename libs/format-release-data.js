module.exports = function(trelloData, releaseData, cb) {
  'use strict';

  var products = require('../conf/products.js')().products;
  var donedoneDomain = require('../conf/trello.js')().donedoneDomain;

  // First, let's get the important sprint information.
  releaseData.sprint = {};
  releaseData.sprint.name = trelloData.boardInfo.name;
  releaseData.sprint.description = trelloData.releaseCard.desc;


  // Now, let's get the release information
  products.forEach(function(product){
    if(!releaseData.products) {
      releaseData.products = {};
    }

    var productId = product.id;
    console.log("Processing: " + productId);

    var stories = trelloData.stories.filter(function(story){
      return story.labels.filter(function(label) {
        return label.name.toLowerCase() === productId;
      }).length > 0;
    })

    var donedone = [];
    var pattern = new RegExp('/(https?:\/\/)?(' + donedoneDomain + '\.mydonedone)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/','i');

    stories.forEach(function(story) {
      if(pattern.exec(story.desc)) {
        // todo: get regex match.
        donedone.push(RegExp.$1);
      }
    });

    var info = {
      stories: stories,
      donedone: donedone,
      changelog: []
    };

    releaseData.products[productId] = info;
  });

  cb();

};
