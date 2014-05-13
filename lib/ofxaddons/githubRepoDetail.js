'use strict';

var client = require('../ofxaddons/index').client;
var _ = require('lodash');
var async = require('async');


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
// @Note the input repoArray is directly modified and returned. 
//
exports.getDetailsForRepoArrayAsync = function(repoArray, detailsSuccess, detailsFailure) {

  // async will run on all objects pushed into queue
  var q = async.queue(function(task, callback) {
    console.log('Queueing ' + task.full_name);
    getDetailsForRepo(task.full_name, callback);
  }, 6000);

  // push all repos to the queue
  _.each(repoArray, function(repo) {
    q.push({
      full_name: repo.full_name
    }, function(loadedRepo) {
      repo.contents = loadedRepo;
    });
  });

  // called when last queued process in finished
  q.drain = function() {
    queueSuccess();
  };

  function queueSuccess() {
    return detailsSuccess(repoArray);
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
        return callback({});
      }

    }

    // success
    else {
      return callback(body);
    }

  });

}


function callAfterGivenTime(resetTime, fn, args) {

  resetTime = new Date(parseInt(resetTime) * 1000).getTime();
  var nowTime = new Date().getTime();
  var diffTime = resetTime - nowTime;

  console.log("API rate limit exceeded, retrying in " + diffTime / 1000 + " seconds");

  setTimeout(function() {
    fn.apply(null, args);
  }, diffTime);

}





// fin
