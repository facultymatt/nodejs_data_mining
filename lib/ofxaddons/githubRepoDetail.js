'use strict';

var client = require('../ofxaddons/index').client;
var _ = require('lodash');
var async = require('async');
var util = require('util');


// function that accepts an array of repos with at least full_name
// property and performs async mass lookup to get the details for each
// and returns the full details in array. 
//
exports.demo = function(req, res) {

  var demoArray = [{
    "full_name": "armadillu/ofxAnimatable"
  }, {
    "full_name": "memo/ofxARDrone"
  }, {
    "full_name": "admsyn/ofxAudioUnit"
  }];

  for (var i = 0; i < 2; i++) {
    demoArray.push({
      "full_name": "admsyn/ofxAudioUnit"
    });
  }

  exports.getDetailsForRepoArrayAsync(demoArray, function(result) {
    res.send(result);
  }, function(error) {
    res.send(error, 500);
  });

};


// Given an array of repos, add a contents property which will be
// object as returned from github API.
//
// @Note the input repoArrayOrObj is directly modified and returned. 
//
exports.getDetailsForRepoArrayAsync = function(repoArrayOrObj, detailsSuccess, detailsFailure) {

  // convert to array if needed
  if (util.isArray(repoArrayOrObj) !== true) {
    repoArrayOrObj = [repoArrayOrObj];
  }

  // async will run on all objects pushed into queue
  var q = async.queue(function(task, doneCallback) {

    // async waterfall executes in order, passing result to next fn.
    async.waterfall([
      function(callback) {
        getDetailsForRepo(task.full_name, function(err, result) {
          if(err) return detailsFailure(task.full_name + ' was not found on github');
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

  }, 6000);

  // push all repos to the queue
  async.each(repoArrayOrObj, function(repo) {
    q.push({
      full_name: repo.full_name
    }, function(loadedRepo) {
      return _.assign(repo, loadedRepo);
    });
  });

  // called when last queued process in finished
  q.drain = function() {
    queueSuccess();
  };

  function queueSuccess() {
    return detailsSuccess(repoArrayOrObj);
  }

}


// get contents of repo from github

function getDetailsForRepo(full_name, callback) {

  client.repo(full_name).contents('', function(err, body, header) {

    if (err) {

      // timeout error, we can handle this by waiting a few seconds
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
    if (file.name === "addon_config.mk" || file.name === "addon.make") {
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
    else if (file.name.toLowerCase() === "changelog.md") {
      parsed.has_changelog = true;
    }

    // check both make file types
    else if (file.name.toLowerCase() === "readme.md") {
      parsed.has_readme = true;
    }

    callback(); // call next in array 

  }, function(err) {
    // all results are done
    return doneCallback(parsed);
  });

};





// fin