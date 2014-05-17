'use strict';

var should = require('should'),
  expect = require('expect.js'),
  mongoose = require('mongoose'),
  Addon = mongoose.model('Addon');

var addon;


// Model properties from kikko 
// @see https://gist.github.com/kikko/10961979#file-addon_crawler-coffee-L196-L206
// @todo add forks if needed
//
describe('Addon Model', function() {

  beforeEach(function(done) {
    addon = new Addon({
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
      githubCreatedAt: '',
      githubUpdatedAt: '',
      lastFetchedAt: '',
      hasMakefile: true,
      hasReadme: true,
      hasWiki: true,
      hasChangelog: false,
      hasThumbnail: true,
      thumbnailUrl: 'https://raw.githubusercontent.com/armadillu/ofxAnimatable/master/ofxaddons_thumbnail.png' 
    });

    // remove all addons from database
    // @Note should be using test database for testing :)
    Addon.remove().exec();
    done();
  });

  afterEach(function(done) {
    Addon.remove().exec();
    done();
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
