'use strict';

var expect = require('expect.js');
var githubUtil = require('../../../lib/ofxaddons/githubUtil.js');
var gitParse = githubUtil.parseRepoContentsAsync;
var callAfter = githubUtil.callAfterGivenTime;


describe('Parse repo contents', function() {

  var files;

  it('finds `addon_config.mk`', function(done) {

    files = [{
      name: 'addon_config.mk'
    }];

    gitParse(files, function(result) {
      expect(result.hasMakefile).to.be(true);
      done();
    });

  });

  it('finds `addon.make`', function(done) {

    files = [{
      name: 'addon.make'
    }];

    gitParse(files, function(result) {
      expect(result.hasMakefile).to.be(true);
      done();
    });

  });

  it('finds `readme.md`', function(done) {

    files = [{
      name: 'readme.md'
    }];

    gitParse(files, function(result) {
      expect(result.hasReadme).to.be(true);
      done();
    });

  });

  it('finds `README.md`', function(done) {

    files = [{
      name: 'README.md'
    }];

    gitParse(files, function(result) {
      expect(result.hasReadme).to.be(true);
      done();
    });

  });

  it('counts folders/ files starting with `example` as examples', function(done) {

    files = [{
      name: 'example-1'
    },{
      name: 'example2'
    },{
      name: 'example3'
    },{
      name: 'EXAMPLE4/'
    }];

    gitParse(files, function(result) {
      expect(result.numExamples).to.be(4);
      done();
    });

  });

  it('finds `changelog.md` and `CHANGELOG.md`', function(done) {

    files = [{
      name: 'CHANGELOG.md'
    }];

    gitParse(files, function(result) {
      expect(result.hasChangelog).to.be(true);
      done();
    });

  });

  it('finds thumbnail named `ofxaddons_thumbnail.png`', function(done) {

    files = [{
      name: 'ofxaddons_thumbnail.png'
    }];

    gitParse(files, function(result) {
      expect(result.hasThumbnail).to.be(true);
      done();
    });

  });

});

describe('Call after given time', function() {

  it('calls function with params given future timestamp', function(done) {

    var timeout = Math.round(+new Date() / 1000) + 1; // 1 second from now

    callAfter(timeout, function(one, two, three) {
      var timeNow = Math.round(+new Date() / 1000);
      expect(timeNow).to.be(timeout);
      expect(one).to.be('one');
      expect(two).to.be('two');
      expect(three).to.be('three');
      done();
    }, ['one', 'two', 'three'])

  });

});
