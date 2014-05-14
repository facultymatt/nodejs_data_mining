'use strict';

var async = require('async');

// check all repos files against different factors
// to provide useful details from filenames. 
// based on check written at https://gist.github.com/kikko/10961979#file-addon_crawler-coffee-L152-L161
// with a few more checks added 
//
// @note this uses async.each() because it will be running within
// the async.queue so it just ensures things go as quickly as possible. 
//
// @param {string} full name of repo
// @param {Array} Should be array of files in repo
// @param {function(object)} Callback with parsed object as first parameter
//
exports.parseRepoContentsAsync = function(fullName, repoContents, doneCallback) {

  var parsed = {
    fullName: fullName,
    hasMakefile: false,
    hasThumbnail: false,
    hasReadme: false,
    hasChangelog: false,
    numExamples: 0
  };


  async.each(repoContents, function(file, callback) {

    file.name = file.name.toLowerCase() || '';

    // check both make file types
    if (file.name === 'addon_config.mk' || file.name === 'addon.make') {
      parsed.hasMakefile = true;
    }

    // examples will be one per folder at root level
    else if (file.name.match(/example/i)) {
      parsed.numExamples += 1;
    }

    // thumbnail has defined naming pattern
    else if (file.name.match(/ofxaddons_thumbnail.png/i)) {
      parsed.hasThumbnail = true;
    }

    // check both make file types
    else if (file.name === 'changelog.md') {
      parsed.hasChangelog = true;
    }

    // check both make file types
    else if (file.name === 'readme.md') {
      parsed.hasReadme = true;
    }

    callback(); // call next in array 

  }, function() {
    // all results are done
    return doneCallback(parsed);
  });

};






// fin