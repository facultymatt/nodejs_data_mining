'use strict';

var mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

var _ = require('lodash');
var async = require('async');
var client = require('../ofxaddons/index').client;

// addon
var AddonSchema = new Schema({
  name: {type: String, default: ''},
  fullName: {type: String, default: ''},
  owner: {
    name: {type: String, default: ''},
    id: {type: String, default: ''},
    avatarUrl: {type: String, default: ''},
    gravatarId: {type: String, default: ''},
    link: {type: String, default: ''}
  },
  commits: {type: Array, default: []},
  fork: {type: Boolean, default: false},
  defaultBranch: {type: String, default: 'master'},
  description: {type: String, default: ''},
  link: {type: String, default: ''},
  starCount: {type: Number, default: 0},
  examplesCount: {type: Number, default: 0},
  openIssuesCount: {type: Number, default: 0},
  forkCount: {type: Number, default: 0},
  githubCreatedAt: {type: Date, default: null},
  githubUpdatedAt: {type: Date, default: null},
  lastFetchedAt: {type: Date, default: null},
  hasMakefile: {type: Boolean, default: false},
  hasReadme: {type: Boolean, default: false},
  hasWiki: {type: Boolean, default: false},
  hasChangelog: {type: Boolean, default: false},
  hasThumbnail: {type: Boolean, default: false},
  thumbnailUrl: {type: String, default: ''}
});

AddonSchema.plugin(timestamps);

AddonSchema.methods.fetchRecentCommits = function(successCb, failureCb) {
  var _this = this;
  client.repo(_this.fullName).commits(function(err, body, header) {
    if(err) return;
    _this.commits = body;
    _this.lastFetchedAt = new Date(header.date).toISOString();
    _this.save(function(err) {
      if(err) return failureCb(err);
      successCb();
    });
  });
}

mongoose.model('Addon', AddonSchema);





// fin