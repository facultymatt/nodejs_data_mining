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
    stats: {},
    addons: [],
    alphaString: alphaString || false,
    prepStats: function(callback) {
      var _this = this;
      _this.stats = new Stat(_this.stats);
      _this.stats.save(function(err, newStat) {
        if (err) return callback(err);
        _this.stats = newStat;
        callback(null);
      });
    },
    crawlGithub: function(callback) {
      var _this = this;
      console.log('_this.alphaString', _this.alphaString);
      ofxGithub.searchAlphabetAysnc(function(addons, stats) {
        _this.addons = addons;
        _this.stats = stats;
        callback(null);
      }, function(err) {
        callback(err);
      }, _this.alphaString);
    },
    saveOrUpdateReposAndSetStats: function(callback) {
      var _this = this;
      async.each(_this.addons, function(item, eachCallback) {
        Addon.findOne({
          fullName: item.fullName
        }).exec(function(err, addon) {
          if (err) return eachCallback(err);
          if (!addon) {
            _this.stats.newRepos++;
            addon = new Addon(item);
          } else {
            _this.updateRepos++;
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
    },
    saveStats: function(callback) {
      var _this = this;
      _this.stats = new Stat(_this.stats);
      _this.stats.save(function(err, newStat) {
        if (err) return callback(err);
        callback(null);
      });
    },
    log: function(callback) {
      var _this = this;
      console.log(_this.cat, _this.addons, _this.stats, _this.alphaString, _this.callback);
      callback();
    }
  };

  async.series([
    processer.prepStats.bind(processer),
    processer.log.bind(processer),
    processer.crawlGithub.bind(processer),
    processer.log.bind(processer),
    processer.saveOrUpdateReposAndSetStats.bind(processer),
    processer.log.bind(processer),
    processer.saveStats.bind(processer),
    processer.log.bind(processer)
  ], function(err) {
    if (err) return failureCb(err);
    successCb();
  });

};
