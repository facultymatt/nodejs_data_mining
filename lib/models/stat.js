'use strict';

var mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

// stat
var StatSchema = new Schema({
  start: {
    type: Date,
    default: Date.now()
  },
  stop: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    default: 'batch_search_all_repos'
  },
  newRepos: {
    type: Number,
    default: 0
  },
  updatedRepos: {
    type: Number,
    default: 0
  },
  report: Schema.Types.Mixed
});

StatSchema.path('type').validate(function (type) {
  var valid = ['batch_search_all_repos', 'batch_fetch_repo_details'];
  if(valid.indexOf(type) === -1) {
    return false;
  } else {
    return true;
  }
}, 'Type must be one of [\'batch_search_all_repos\', \'batch_fetch_repo_details\']');

StatSchema.plugin(timestamps);

mongoose.model('Stat', StatSchema);
