'use strict';

var expect = require('expect.js'),
  express = require('express'),
  nock = require('nock'),
  mocks = require('../ofxaddons/githubRepoDetailMock.js'),
  ofxGithub = require('../../../lib/ofxaddons/index.js');


describe('getting repos contents', function() {

  var manyReposArray, singleRepoArray, limitArray, singleRepoObj, scope1, scope2, scope3, scopeLimit;

  beforeEach(function(done) {
    
    scope1 = mocks.ofxAnimatable();
    scope2 = mocks.ofxARDrone();
    scope3 = mocks.ofxAudioUnit();
    scopeLimit = mocks.requestLimit();

    manyReposArray = [{
      "full_name": "armadillu/ofxAnimatable"
    }, {
      "full_name": "memo/ofxARDrone"
    }, {
      "full_name": "admsyn/ofxAudioUnit"
    }];
    limitArray = [{
      "full_name": "request/limit"
    }];
    singleRepoArray = [{
      "full_name": "admsyn/ofxAudioUnit"
    }];
    singleRepoObj = {
      "full_name": "admsyn/ofxAudioUnit"
    };
    done();
  });

  afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  describe('given array of repo objects with at least full_name property', function() {

    it('will perform async lookup to github for each repo', function(done) {
      ofxGithub.getDetailsForRepoArrayAsync(manyReposArray, function(reposWithDetails) {
        expect(reposWithDetails.length).to.be(3);
        scope1.done();
        scope2.done();
        scope3.done();
        done();
      }, function(err) {
        if (err) throw err;
      });
    });

  });

  describe('given array of one repo', function() {

    it('will lookup details for single repo', function(done) {
      ofxGithub.getDetailsForRepoArrayAsync(singleRepoArray, function(repoWithDetails) {
        expect(repoWithDetails.length).to.be(1);
        scope3.done();
        done();
      }, function(err) {
        if (err) throw err;
      });
    });

  });

  describe('given a single repo object', function() {

    it('will lookup details for single repo object', function(done) {

      ofxGithub.getDetailsForRepoArrayAsync(singleRepoObj, function(repoWithDetails) {
        expect(repoWithDetails.length).to.be(1);
        scope3.done();
        done();
      }, function(err) {
        if (err) throw err;
      });
    });

  });

  describe('on API rate limit exceeded error from github', function() {

    it('should retry after `x-ratelimit-reset` specified in header', function(done) {

      // get details for this repo! 
      ofxGithub.getDetailsForRepoArrayAsync(limitArray, function() {
        // if timeout is handled properly by crawler this callback will
        // never happen. No need to check contents of callback here. 
        scopeLimit.done();
        done();
      }, function(err) {
        if (err) throw err;
      });

    });

  });

});


describe('parsing file contents', function() {

  var authParams = '&client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

  var parsedContents, addon;

  afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  describe('repo with no important files', function(done) {

    var scope;

    beforeEach(function(done) {

      scope = mocks.lame();

      addon = {
        "full_name": "lame/addon"
      };

      parsedContents = {
        full_name: "lame/addon",
        hasMakefile: false,
        hasThumbnail: false,
        hasReadme: false,
        hasChangelog: false,
        examplesCount: 0,
        "lastFetchedAt": "2014-05-13T19:03:10.000Z"
      };

      done();

    });

    it('should return default object', function(done) {

      //mocks.lame();

      ofxGithub.getDetailsForRepoArrayAsync(addon, function(repoWithDetails) {
        expect(repoWithDetails[0]).to.eql(parsedContents);
        done();
      }, function(err) {
        if (err) throw err;
      });

    });

  });

  describe('repo with many important files!', function(done) {

    var scope;

    beforeEach(function(done) {

      scope = mocks.ofxAudioUnit();

      addon = {
        "full_name": "admsyn/ofxAudioUnit"
      };

      parsedContents = {
        full_name: "admsyn/ofxAudioUnit",
        hasMakefile: true,
        hasThumbnail: true,
        hasReadme: true,
        hasChangelog: true,
        examplesCount: 5,
        "lastFetchedAt": "2014-05-13T19:05:32.000Z"
      };

      done();

    });

    it('should set properties based on files found', function(done) {

      ofxGithub.getDetailsForRepoArrayAsync(addon, function(repoWithDetails) {
        expect(repoWithDetails[0]).to.eql(parsedContents);
        done();
      }, function(err) {
        if (err) throw err;
      });

    });

  });

  describe('repo with alternate makefile', function(done) {

    var scope;

    beforeEach(function(done) {

      scope = mocks.altMakeFile();

      addon = {
        "full_name": "alt/makefile"
      };

      parsedContents = {
        full_name: "alt/makefile",
        hasMakefile: true,
        hasThumbnail: false,
        hasReadme: false,
        hasChangelog: false,
        examplesCount: 0,
        "lastFetchedAt": "2014-05-13T19:03:10.000Z"
      };

      done();

    });

    it('should detect alternate pattern for makefile', function(done) {

      ofxGithub.getDetailsForRepoArrayAsync(addon, function(repoWithDetails) {
        expect(repoWithDetails[0]).to.eql(parsedContents);
        scope.done();
        done();
      }, function(err) {
        if (err) throw err;
      });

    });

  });

});
