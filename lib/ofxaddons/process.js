'use strict';

var ofxGithub = require('../ofxaddons/index');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Addon = mongoose.model('Addon');
var Stat = mongoose.model('Stat');


// Given array of prepped addons will either find that addon, update, and save it
// OR create a new addon and save it.
//    
// @note that addons should already be parsed and ready to go
// 





exports.searchAddonsAndUpdateDatabase = function(successCb, failureCb, alphaString) {

  var processer = {
    addons: [],
    stats: {}
  };

  var crawlGithub = function(callback) {
    console.log('===================');
    ofxGithub.searchAlphabetAysnc(function(addons, stats) {
      processer.addons = addons;
      processer.stats = new Stat({report: stats});
      callback(null);
    }, function(err) {
      callback(err);
    }, alphaString);
  }

  var saveOrUpdateReposAndSetStats = function(callback) {
    async.each(processer.addons, function(item, eachCallback) {
      Addon.findOne({
        fullName: item.fullName
      }).exec(function(err, addon) {
        if (err) return eachCallback(err);
        if (!addon) {
          processer.stats.newRepos++;
          addon = new Addon(item);
        } else {
          processer.stats.updatedRepos++;
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

  var saveStats = function(callback) {
    processer.stats.save(function(err) {
      if (err) return callback(err);
      callback(null);
    });
  }

  var log = function(callback) {
    console.log(processer.stats);
    callback();
  };

  async.series([
    crawlGithub,
    log,
    saveOrUpdateReposAndSetStats,
    log,
    saveStats,
    log
  ], function(err) {
    if (err) return failureCb(err);
    successCb();
  });

};
