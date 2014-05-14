'use strict';

var client = require('../ofxaddons/index').client;
var githubUtil = require('../ofxaddons/githubUtil.js');
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
        githubUtil.parseRepoContentsAsync(task.full_name, contents, function(result) {
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
      delete repo.full_name;
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
        return githubUtil.callAfterGivenTime(resetTime, getDetailsForRepo, [full_name, callback]);
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



// fin