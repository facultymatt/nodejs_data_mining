'use strict';

var ofxGithub = require('../ofxaddons/index');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Addon = mongoose.model('Addon');
var Stat = mongoose.model('Stat');

// Pub API method that will start crawling github, update database, 
// fetch details from github, and then save the stats to database
// 
// This task can be run manually and should be scheduled to run every x minutes
//
// Optionally you can pass a specific letter to crawl a limited set of letters
//
exports.searchAddonsAndUpdateDatabase = function(successCb, failureCb, alphaString) {

  // scoped variables applied to each function
  var processer = {
    addons: [],
    newRepos: {},
    updatedRepos: {},
    stats: {},
    alphaString: alphaString
  };

  async.applyEachSeries([
    crawlGithub,
    saveOrUpdateReposAndSetStats,
    loadReposToFetch,
    fetchDetails,
    updateRepos,
    saveStats
  ], processer, function(err) {
    if (err) return failureCb(err);
    successCb();
  });

};


// Fetches all addons from databased on replaced the addons array
// 
function loadReposToFetch(processer, callback) {
  Addon.find({}).exec(function(err, allAddons) {
    if(err) return callback(err);
    processer.addons = allAddons;
    callback();
  });
}


// fetches details and merges details into original object
// 
function fetchDetails(processer, callback) {
  var addons = processer.addons;
  ofxGithub.getDetailsForRepoArrayAsync(addons, function() {
    processer.addons = addons;
    callback(null);
  }, function(err) {
    callback(err);
  });
}

// Given array of prepped addons will either find that addon, update, and save it
// OR create a new addon and save it.
//    
// @note that addons should already be parsed and ready to go
// 

function crawlGithub(processer, callback) {
  ofxGithub.searchAlphabetAysnc(function(addons, stats) {
    processer.addons = addons;
    processer.stats = new Stat({
      report: stats
    });
    callback(null);
  }, function(err) {
    callback(err);
  }, processer.alphaString);
}

// Given array of repos, save or update in database
// will increment stats for newRepos or updatedRepos
// 

function saveOrUpdateReposAndSetStats(processer, callback) {
  async.each(processer.addons, function(item, eachCallback) {
    Addon.findOne({
      fullName: item.fullName
    }).exec(function(err, addon) {
      if (err) return eachCallback(err);
      if (!addon) {
        processer.newRepos[item.fullName] = 1;
        addon = new Addon(item);
      } else {
        processer.updatedRepos[item.fullName] = 1;
        addon = _.assign(addon, item);
      }
      addon.save(function(err, item) {
        if (err) return eachCallback(err);
        eachCallback(null);
      });
    });
  }, function(err) {
    if (err) return callback(err);
    callback(null);
  });
}


function updateRepos(processer, callback) {
  async.each(processer.addons, function(item, eachCallback) {
    Addon.findOne({
      fullName: item.fullName
    }).exec(function(err, addon) {
      if (err) return eachCallback(err);
      addon = _.assign(addon, item);
      addon.save(function(err, item) {
        if (err) return eachCallback(err);
        eachCallback(null);
      });
    });
  }, function(err) {
    if (err) return callback(err);
    callback(null);
  });
}

// saves modified stats to database
// call this after we adjust values 
// 

function saveStats(processer, callback) {
  processer.stats.newRepos = Object.keys(processer.newRepos).length;
  processer.stats.updatedRepos = Object.keys(processer.updatedRepos).length;
  processer.stats.save(function(err) {
    if (err) return callback(err);
    callback(null);
  });
}




// fin
