'use strict';

var expect = require('expect.js'),
  express = require('express');
  var nock = require('nock');

var mocks = require('../ofxaddons/repoContentsMock.js');

var ofxGithub = require('../../../lib/ofxaddons/index.js');

describe('searching repos', function() {

  describe('on max request error from github', function() {

    it('should retry after specified time', function(done) {

      var demoArray = [{
        "full_name": "armadillu/ofxAnimatable"
      }, {
        "full_name": "memo/ofxARDrone"
      }, {
        "full_name": "admsyn/ofxAudioUnit"
      }];

      mocks.limit('/repos/armadillu/ofxAnimatable/contents/?ref=master');

      ofxGithub.getDetailsForRepoArrayAsync(demoArray, function(result) {
        //console.log(result);
        done();
      }, function(error) {
        //console.log(result);
        done();
      });

    });

  });

});
