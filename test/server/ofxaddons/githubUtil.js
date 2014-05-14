'use strict';

var expect = require('expect.js');
var githubUtil = require('../../../lib/ofxaddons/githubUtil.js');
var gitParse = githubUtil.parseRepoContentsAsync;

describe('Parse repo contents', function() {

  var files;

  it('finds `addon_config.mk`', function() {

    files = [{
      name: 'addon_config.mk'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasMakefile).to.be(true);
    });

  });

  it('finds `addon.make`', function() {

    files = [{
      name: 'addon.make'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasMakefile).to.be(true);
    });

  });

  it('finds `readme.md`', function() {

    files = [{
      name: 'readme.md'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasReadme).to.be(true);
    });

  });

  it('finds `README.md`', function() {

    files = [{
      name: 'README.md'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasReadme).to.be(true);
    });

  });

  it('counts folders/ files starting with `example` as examples', function() {

    files = [{
      name: 'example-1'
    },{
      name: 'example2'
    },{
      name: 'example3'
    },{
      name: 'EXAMPLE4/'
    }];

    gitParse(null, files, function(result) {
      expect(result.numExamples).to.be(4);
    });

  });

  it('finds `changelog.md` and `CHANGELOG.md`', function() {

    files = [{
      name: 'CHANGELOG.md'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasChangelog).to.be(true);
    });

  });

  it('finds thumbnail named `ofxaddons_thumbnail.png`', function() {

    files = [{
      name: 'ofxaddons_thumbnail.png'
    }];

    gitParse(null, files, function(result) {
      expect(result.hasThumbnail).to.be(true);
    });

  });



});
