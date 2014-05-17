'use strict';

var mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

// addon
var AddonSchema = new Schema({
  name: String,
  info: String,
  awesomeness: Number
});

AddonSchema.plugin(timestamps);

mongoose.model('Addon', AddonSchema);
