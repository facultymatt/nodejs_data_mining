'use strict';

var client = require('../ofxaddons/index').client;
var _ = require('lodash');
var async = require('async');
var util = require('util');


// Given an array of repos, add a contents property which will be
// object as returned from github API.
//
// @Note the input repoArrayOrObj is directly modified and returned. 
//
// @Note You should run this in smaller batches to prevent the 5000 limit
// from being reached too quickly. For example process 2000 per 30 minutes.
// this will save room for other API calls too.
//
// @param {mixed} Array of repo objects OR single repo object
// @param {function()} Called on successful loading of all repos
// @param {function()} Called if any requests returns error other than timeout
//
// @return {array} Original array with new properties merged into original repo objects 
//
exports.getDetailsForRepoArrayAsync = function(repoArrayOrObj, detailsSuccess, detailsFailure) {

  // how many concurrent requests to make to github for repos
  var maxRequests = 1000;

  // convert to array if needed
  if (util.isArray(repoArrayOrObj) !== true) {
    repoArrayOrObj = [repoArrayOrObj];
  }

  // async will run on all objects pushed into queue
  var q = async.queue(function(task, doneCallback) {

    // async waterfall executes in order, passing result to next fn.
    // any callback passing error as first param will stop the waterfall
    async.waterfall([
      function(callback) {
        getDetailsForRepo(task.full_name, function(err, result) {
          if (err) return detailsFailure(task.full_name + ' was not found on github');
          callback(null, result);
        });
      },
      function(contents, callback) {
        parseRepoContents(task.full_name, contents, function(result) {
          callback(null, result);
        });
      },
      function(result) {
        doneCallback(result);
      }
    ]);

  }, maxRequests);

  // push all repos to the queue
  async.each(repoArrayOrObj, function(repo) {
    q.push({
      full_name: repo.full_name
    }, function(loadedRepo) {
      return _.assign(repo, loadedRepo); // @todo make async? 
    });
  });

  // called when last queued process in finished
  q.drain = function() {
    return detailsSuccess(repoArrayOrObj);
  };

};


// get contents of repo from github
// smartly call again if we get request limit error
//
// @param {string} Full name of the repo, ie: username/reponame
// @param {function(error, success)} Callback 
//

function getDetailsForRepo(full_name, callback) {

  client.repo(full_name).contents('', function(err, body) {

    // err could be many codes 
    if (err) {

      // we only check for 403, timeout error, 
      // we can handle this by waiting a few seconds
      // and then trying again
      if (err.statusCode === 403) {

        // grab reset time from headers and call again later
        var resetTime = err.headers['x-ratelimit-reset'];
        return callAfterGivenTime(resetTime, getDetailsForRepo, [full_name, callback]);
      }

      // end with empty object
      else {
        return callback(err, null);
      }

    }

    // success
    else {
      return callback(null, body);
    }

  });

}


// calls function again after time with given arguments
// 
// @todo move into helper since this is used in all github calls
//
// @param {string} time directly from github response headers
// @param {function} Function to call after time
// @param {array} Array of args applied to function 
//

function callAfterGivenTime(resetTime, fn, args) {

  resetTime = new Date(parseInt(resetTime) * 1000).getTime();
  var nowTime = new Date().getTime();
  var diffTime = resetTime - nowTime;

  //console.log("\nAPI rate limit exceeded, retrying in " + diffTime / 1000 + " seconds\n");

  setTimeout(function() {
    fn.apply(null, args);
  }, diffTime);

}


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

function parseRepoContents(fullName, repoContents, doneCallback) {

  var parsed = {
    full_name: fullName,
    has_makefile: false,
    has_thumbnail: false,
    has_readme: false,
    has_changelog: false,
    num_examples: 0
  };

  async.each(repoContents, function(file, callback) {

    // check both make file types
    if (file.name === 'addon_config.mk' || file.name === 'addon.make') {
      parsed.has_makefile = true;
    }

    // examples will be one per folder at root level
    else if (file.name.match(/example/i)) {
      parsed.num_examples += 1;
    }

    // thumbnail has defined naming pattern
    else if (file.name.match(/ofxaddons_thumbnail.png/i)) {
      parsed.has_thumbnail = true;
    }

    // check both make file types
    else if (file.name.toLowerCase() === 'changelog.md') {
      parsed.has_changelog = true;
    }

    // check both make file types
    else if (file.name.toLowerCase() === 'readme.md') {
      parsed.has_readme = true;
    }

    callback(); // call next in array 

  }, function() {
    // all results are done
    return doneCallback(parsed);
  });

}





// fin