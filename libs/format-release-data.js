module.exports = function(program, trelloData, releaseData, cb) {
  'use strict';

  var marked = require('marked'),
      products = require('../conf/products.js')().products;

  var donedoneDomain = program.donedoneDomain;

  // First, let's get the important sprint information.
  releaseData.sprint = {};
  releaseData.sprint.name = trelloData.boardInfo.name;
  releaseData.sprint.description = trelloData.releaseCard.desc ? marked(trelloData.releaseCard.desc) : '[No description provided]';
  releaseData.year = new Date().getFullYear();


  // Retrieve story and donedone information for each product
  products.forEach(function(product){
    if(!releaseData.products) {
      releaseData.products = {};
    }

    var productId = product.id;

    // Get only the stories for this product.
    var stories = trelloData.stories.filter(function(story){
      return story.labels.filter(function(label) {
        return label.name.toLowerCase() === productId;
      }).length > 0;
    }).map(function(item) {

      // Get the points so that we can order by story complexity.
      var points;
      if(/^\((\d+)\).*/.exec(item.name)) {
        points = Number(RegExp.$1);
        if(isNaN(points)) {
          points = -1;
        }
      }

      // Replace "estimated" and "actual" value annotations;
      var name = item.name.replace(/(\(|\[)(\d+)(\)|\])(\s)*/ig, '');

      return {
        name: name,
        desc: marked(item.desc),
        url: item.shortUrl,
        points: points
      };
    });

    if(stories.length > 0) {

      // Sort the stories by total points
      stories.sort(function(item1, item2){
        return item1.points < item2.points;
      });

      // Get any embedded DoneDone links
      var donedone = [],
          matches,
          match,
          url,
          info,
          pattern = new RegExp('https://' + donedoneDomain + '\.mydonedone\.com/issuetracker/projects/([0-9])*/issues/([0-9])*','ig');

      stories.forEach(function(story) {
        matches = story.desc.match(pattern);
        if(matches) {
          try {
            url = RegExp.lastMatch;
            match = url.match('issues\/([0-9]*)');
            if(match) {
              donedone.push({
                url: url,
                issue: match[1]
              });
            }
          } catch (err) {
            cb(err);
          }
        }
      });

      info = {
        label: productId.toUpperCase(),
        stories: stories,
        donedone: donedone,
        changelog: []
      };

      releaseData.products[productId] = info;

    }
  });

  cb();

};
