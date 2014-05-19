'use strict';

var expect = require('expect.js'),
  express = require('express'),
  nock = require('nock'),
  mocks = require('../ofxaddons/githubRepoSearchMock.js'),
  ofxGithub = require('../../../lib/ofxaddons/index.js');


describe('Searching github', function() {

  var searchAPage1, searchAPage2, searchBPage1, searchBPage2, searchBPage2Fail, searchAPage2Timeout, searchAPage2Error, searchAPage2Incomplete;

  afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  it('spawns async search for each letter', function(done) {

    searchAPage1 = mocks.searchAPage1();
    searchAPage2 = mocks.searchAPage2();
    searchBPage1 = mocks.searchBPage1();
    searchBPage2 = mocks.searchBPage2();

    var successCb = function(items, stats) {
      expect(items.length).to.be(7);
      expect(stats).to.eql([{
        letter: 'a',
        pages: 2,
        per_page: 2,
        total_count: 4,
        incomplete_results: false
      }, {
        letter: 'b',
        pages: 2,
        per_page: 2,
        total_count: 3,
        incomplete_results: false
      }]);
      searchAPage1.done();
      searchAPage2.done();
      searchBPage1.done();
      searchBPage2.done();
      done();
    };

    // will not call done and thus test will fail
    var failureCb = function(errorObj) {};

    ofxGithub.searchAlphabetAysnc(successCb, failureCb, 'ab');

  });

  it('flags incomplete_results if included with github response', function(done) {
    searchAPage1 = mocks.searchAPage1();
    searchAPage2Incomplete = mocks.searchAPage2Incomplete();
    searchBPage1 = mocks.searchBPage1();
    searchBPage2 = mocks.searchBPage2();

    var successCb = function(items, stats) {
      expect(stats).to.eql([{
        letter: 'a',
        pages: 2,
        per_page: 2,
        total_count: 4,
        incomplete_results: true
      }, {
        letter: 'b',
        pages: 2,
        per_page: 2,
        total_count: 3,
        incomplete_results: false
      }]);
      searchAPage1.done();
      searchAPage2Incomplete.done();
      searchBPage1.done();
      searchBPage2.done();
      done();
    };

    // will not call done and thus test will fail
    var failureCb = function(errorObj) {};

    ofxGithub.searchAlphabetAysnc(successCb, failureCb, 'ab');
  });

  it('handles request timeout', function(done) {
    searchAPage1 = mocks.searchAPage1();
    searchAPage2Timeout = mocks.searchAPage2Timeout();
    searchBPage1 = mocks.searchBPage1();
    searchBPage2 = mocks.searchBPage2();

    // will not call done and thus test will fail
    var successCb = function(items, stats) {
      expect(items.length).to.be(7);
      searchAPage1.done();
      searchAPage2Timeout.done();
      searchBPage1.done();
      searchBPage2.done();
      done();
    };

    var failureCb = function(errorObj) {};

    ofxGithub.searchAlphabetAysnc(successCb, failureCb, 'ab');

  });

  it('calls error callback if process fails', function(done) {

    searchAPage1 = mocks.searchAPage1();
    searchAPage2Error = mocks.searchAPage2Error();

    var successCb = function(items, stats) {};

    // will not call done and thus test will fail
    var failureCb = function(errorObj) {
      expect(errorObj.message).to.eql('Queue was killed due to error from github');
      searchAPage1.done();
      searchAPage2Error.done();
      done();
    };

    ofxGithub.searchAlphabetAysnc(successCb, failureCb, 'ab');

  });

  it('parses each repo', function(done) {

    searchAPage1 = mocks.searchAPage1();
    searchAPage2 = mocks.searchAPage2();

    // will not call done and thus test will fail
    var successCb = function(items, stats) {
      expect(items.length).to.be(4);

      var theItem = items[0];

      expect(theItem).to.eql({
        name: 'ofxAVFVideoPlayer',
        fullName: 'kronick/ofxAVFVideoPlayer',
        owner: {
          name: 'kronick',
          id: 186834,
          avatarUrl: 'https://avatars.githubusercontent.com/u/186834?',
          gravatarId: 'abd0ffdcfe5fea1b2319e61ded9452f0',
          link: 'https://github.com/kronick'
        },
        fork: false,
        defaultBranch: 'master',
        description: 'OpenFrameworks addon to support super fast super smooth AV Foundation video playback on OSX 10.7+',
        link: 'https://github.com/kronick/ofxAVFVideoPlayer',
        starCount: 24,
        openIssuesCount: 2,
        forkCount: 25,
        githubCreatedAt: '2013-06-11T19:34:23Z',
        githubUpdatedAt: '2014-05-14T07:12:51Z',
        lastFetchedAt: null
      
      });

      searchAPage1.done();
      searchAPage2.done();
      done();
    };

    var failureCb = function(errorObj) {};

    ofxGithub.searchAlphabetAysnc(successCb, failureCb, 'a');
  });

});





// fin
