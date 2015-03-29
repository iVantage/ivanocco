module.exports = function(program, data, cb) {
  'use strict';

  var fs = require('fs'),
      path = require('path'),
      hbs = require('handlebars');

  var saveLoc = process.cwd(),
      outDir = path.join(saveLoc, 'data'),
      outFile = path.join(outDir, program.outfile);

  var tplStr = fs.readFileSync(__dirname + '/../tpl/release-notes.hbs').toString(),
      tpl = hbs.compile(tplStr);

  if(!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(outFile, tpl(data));

  cb(null);

};
