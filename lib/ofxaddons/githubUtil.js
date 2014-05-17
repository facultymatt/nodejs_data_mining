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

  var template = {
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
      template.hasMakefile = true;
    }

    // examples will be one per folder at root level
    else if (file.name.match(/example/i)) {
      template.numExamples += 1;
    }

    // thumbnail has defined naming pattern
    else if (file.name.match(/ofxaddons_thumbnail.png/i)) {
      template.hasThumbnail = true;
    }

    // check both make file types
    else if (file.name === 'changelog.md') {
      template.hasChangelog = true;
    }

    // check both make file types
    else if (file.name === 'readme.md') {
      template.hasReadme = true;
    }

    callback(); // call next in array 

  }, function() {
    // all results are done
    return doneCallback(template);
  });

};

exports.parseRepo = function(item) {

  var template = {
    name: item.name || null,
    fullName: item.full_name || null,
    owner: {
      name: item.owner.login || null,
      id: item.owner.id || null,
      avatarUrl: item.owner.avatar_url || null,
      gravatarId: item.owner.gravatar_id || null,
      link: item.owner.html_url || null
    },
    fork: item.fork,
    defaultBranch: item.default_branch || null,
    description: item.description || null,
    link: item.html_url || null,
    starCount: item.stargazers_count || null,
    openIssuesCount: item.open_issues_count || null,
    forkCount: item.forks || null,
    githubCreatedAt: item.created_at || null,
    githubUpdatedAt: item.updated_at || null,
    lastFetchedAt: item.fetchTime || null
  };

  return template;

};



// calls function again after time with given arguments
// 
// @todo move into helper since this is used in all github calls
//
// @param {string} time directly from github response headers
// @param {function} Function to call after time
// @param {array} Array of args applied to function 
//

exports.callAfterGivenTime = function(resetTime, fn, args) {

  resetTime = new Date(parseInt(resetTime) * 1000).getTime();
  var nowTime = new Date().getTime();
  var diffTime = resetTime - nowTime;

  //console.log("\nAPI rate limit exceeded, retrying in " + diffTime / 1000 + " seconds\n");

  setTimeout(function() {
    fn.apply(null, args);
  }, diffTime);

};





// fin
