'use strict';

var should = require('should'),
  expect = require('expect.js'),
  mongoose = require('mongoose'),
  Addon = mongoose.model('Addon');

var addon, template;


// Model properties inspired by kikko 
// @see https://gist.github.com/kikko/10961979#file-addon_crawler-coffee-L196-L206
// @todo add forks if needed
//
describe('Addon Model', function() {

  template = {
    name: 'coolAddon',
    fullName: 'coolDev/coolAddon',
    owner: {
      name: 'coolDev',
      id: 1234,
      avatarUrl: 'https://avatars.githubusercontent.com/u/186834?',
      gravatarId: 'abd0ffdcfe5fea1b2319e61ded9452f0',
      link: 'https://github.com/kronick'
    },
    fork: false,
    defaultBranch: 'master',
    description: 'some description',
    link: 'https://github.com/kronick/ofxAVFVideoPlayer',
    starCount: 2,
    examplesCount: 10,
    openIssuesCount: 2,
    forkCount: 1,
    hasMakefile: true,
    hasReadme: true,
    hasWiki: true,
    hasChangelog: false,
    hasThumbnail: true,
    thumbnailUrl: 'https://raw.githubusercontent.com/armadillu/ofxAnimatable/master/ofxaddons_thumbnail.png'
  };

  beforeEach(function(done) {
    addon = new Addon(template);

    // remove all addons from database
    // @Note should be using test database for testing :)
    Addon.remove().exec();
    done();
  });

  afterEach(function(done) {
    Addon.remove().exec();
    done();
  });

  describe('has model property', function() {

    beforeEach(function(done) {
      addon.save(function() {
        done();
      });
    });

    it('name', function(done) {
      expect(addon.name).to.eql(template.name);
      done();
    });
    it('fullName', function(done) {
      expect(addon.fullName).to.eql(template.fullName);
      done();
    });
    
    it('owner.name', function(done) {
      expect(addon.owner.name).to.eql(addon.owner.name);
      done();
    });
    it('owner.link', function(done) {
      expect(addon.owner.link).to.eql(template.owner.link);
      done();
    });
    it('owner.id', function(done) {
      expect(addon.owner.id).to.eql(template.owner.id);
      done();
    });
    it('owner.avatarUrl', function(done) {
      expect(addon.owner.avatarUrl).to.eql(template.owner.avatarUrl);
      done();
    });
    it('owner.gravatarId', function(done) {
      expect(addon.owner.gravatarId).to.eql(template.owner.gravatarId);
      done();
    });

    it('fork', function(done) {
      expect(addon.fork).to.eql(template.fork);
      done();
    });
    it('defaultBranch', function(done) {
      expect(addon.defaultBranch).to.eql(template.defaultBranch);
      done();
    });
    it('description', function(done) {
      expect(addon.description).to.eql(template.description);
      done();
    });
    it('link', function(done) {
      expect(addon.link).to.eql(template.link);
      done();
    });
    it('starCount', function(done) {
      expect(addon.starCount).to.eql(template.starCount);
      done();
    });
    it('examplesCount', function(done) {
      expect(addon.examplesCount).to.eql(template.examplesCount);
      done();
    });
    it('openIssuesCount', function(done) {
      expect(addon.openIssuesCount).to.eql(template.openIssuesCount);
      done();
    });
    it('forkCount', function(done) {
      expect(addon.forkCount).to.eql(template.forkCount);
      done();
    });
    it('githubCreatedAt', function(done) {
      expect(addon.githubCreatedAt).to.eql(null);
      done();
    });
    it('githubUpdatedAt', function(done) {
      expect(addon.githubUpdatedAt).to.eql(null);
      done();
    });
    it('lastFetchedAt', function(done) {
      expect(addon.lastFetchedAt).to.eql(null);
      done();
    });

    // files
    it('hasMakefile', function(done) {
      expect(addon.hasMakefile).to.eql(template.hasMakefile);
      done();
    });
    it('hasReadme', function(done) {
      expect(addon.hasReadme).to.eql(template.hasReadme);
      done();
    });
    it('hasWiki', function(done) {
      expect(addon.hasWiki).to.eql(template.hasWiki);
      done();
    });
    it('hasChangelog', function(done) {
      expect(addon.hasChangelog).to.eql(template.hasChangelog);
      done();
    });
    it('hasThumbnail', function(done) {
      expect(addon.hasThumbnail).to.eql(template.hasThumbnail);
      done();
    });
    it('thumbnailUrl', function(done) {
      expect(addon.thumbnailUrl).to.eql(template.thumbnailUrl);
      done();
    });

  });

  // it('should begin with no addons', function(done) {
  //   Addon.find({}, function(err, addons) {
  //     addons.should.have.length(0);
  //     done();
  //   });
  // });

  // it('should begin with no addons', function(done) {
  //   Addon.find({}, function(err, addons) {
  //     addons.should.have.length(0);
  //     done();
  //   });
  // });

  // it('should have createdAt property', function(done) {
  //   var date = new Date();
  //   addon.save(function(err, newAddon) {
  //     expect(addon.createdAt).to.eql(date);
  //     done();
  //   });
  // });

  // it('should have updatedAt property', function(done) {
  //   var date = new Date();
  //   addon.save(function(err, newAddon) {
  //     expect(addon.updatedAt).to.eql(date);
  //     done();
  //   });
  // });

  // it('should not changed createdAt property on update', function(done) {
  //   var date;
  //   addon.save(function(err, newAddon) {
  //     addon.name = 'testing';
  //     date = addon.createdAt;
  //     addon.save(function(err, newAddon) {
  //       expect(addon.createdAt).to.eql(date);
  //       done();
  //     });
  //   });
  // });

});




// fin
