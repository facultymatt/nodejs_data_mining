var should = require('should'),
  expect = require('expect.js'),
  nock = require('nock'),
  mocks = require('../ofxaddons/processMocks.js'),
  modelMocks = require('../addon/addonMock.js'),
  mongoose = require('mongoose'),
  ofxProcess = require('../../../lib/ofxaddons/process.js')
  Stat = mongoose.model('Stat'),
  Addon = mongoose.model('Addon');

var addon, mockSearch, mockSearchAndFindNew, mockDetails, serach, details, recentCommits;

var noop = function() {};

describe('processing addons', function() {

  beforeEach(function(done) {
    addon = new Addon({
      fullName: 'cool/addon'
    });
    // populates database with a addon
    // this allows us to simulate "updating" an addon 
    addon.save(function() {
      done();
    });

    search = mocks.searchAndFindNew();
    details = mocks.details();
    recentCommits = modelMocks.recentCommits();

  });

  afterEach(function(done) {
    Addon.remove().exec();
    Stat.remove().exec();
    done();
  });

  describe('finds all addons', function() {

    it('insets new addons into database', function(done) {

      var successCb = function() {
        Addon.find({}).exec(function(err, allAddons) {
          expect(allAddons.length).to.be(2);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });

    it('updates existing addons in database', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Addon.findOne({fullName: 'cool/addon'}).exec(function(err, addon) {
          expect(addon.starCount).to.be(24);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });

    it('saves stats to database', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Stat.find({}).exec(function(err, allStats) {
          expect(allStats.length).to.be(1);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });

    it('sets stats properties based on save OR update from waterfall', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Stat.find({}).exec(function(err, allStats) {
          expect(allStats[0].newRepos).to.be(1);
          expect(allStats[0].updatedRepos).to.be(1);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });

  });

  describe('fetches supplemental information for new addons', function() {

    beforeEach(function(done) {
      
      var mock = [];
      mock.push(new Addon({
        fullName: 'new/addon'
      }));
      mock.push(new Addon({
        fullName: 'cool/addon'
      }));
      mock.push(new Addon({
        fullName: 'old/1',
        lastFetchedAt: new Date('2011-04-11T11:51:00')
      }));
      mock.push(new Addon({
        fullName: 'old/2',
        lastFetchedAt: new Date('2011-04-11T11:52:00')
      }));
      mock.push(new Addon({
        fullName: 'old/3',
        lastFetchedAt: new Date('2011-04-11T11:53:00')
      }));
      Addon.create(mock).then(function() {
        done();
      });
    });

    it('gets contents for repos', function(done) {

      var successCb = function() {
        Addon.findOne({
          fullName: 'cool/addon'
        }).exec(function(err, theAddon) {
          expect(theAddon.examplesCount).to.be(4);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });

    it('gets recent commits for repos', function(done) {

      var successCb = function() {
        Addon.findOne({
          fullName: 'cool/addon'
        }).exec(function(err, theAddon) {
          console.log(theAddon.commits);
          expect(theAddon.commits.length).to.be(2);
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });


    it('does not update addons that were not just fetched', function(done) {

      var successCb = function() {
        Addon.find({
          fullName: 'old/1'
        }).exec(function(err, addon) {
          expect(addon[0].lastFetchedAt).to.be.lessThan(new Date('2014-01-01T01:00:00'));
          done();
        });
      };

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, noop, 'a');

    });



  });

});
