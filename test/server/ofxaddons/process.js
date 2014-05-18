var should = require('should'),
  expect = require('expect.js'),
  nock = require('nock'),
  mocks = require('../ofxaddons/processMocks.js'),
  mongoose = require('mongoose'),
  ofxProcess = require('../../../lib/ofxaddons/process.js')
  Stat = mongoose.model('Stat'),
  Addon = mongoose.model('Addon');

var addon, mockSearch, mockSearchAndFindNew, mockDetails;

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

      var failureCb = function() {};

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, failureCb, 'a');

    });

    it('updates existing addons in database', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Addon.find({}).exec(function(err, allAddons) {
          expect(allAddons[0].starCount).to.be(24);
          done();
        });
      };

      var failureCb = function() {};

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, failureCb, 'a');

    });

    it('saves stats to database', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Stat.find({}).exec(function(err, allStats) {
          expect(allStats.length).to.be(1);
          done();
        });
      };

      var failureCb = function() {};

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, failureCb, 'a');

    });

    it('sets stats properties based on save OR update from waterfall', function(done) {

      // the first addon should be updated with the new number of stars
      var successCb = function() {
        Stat.find({}).exec(function(err, allStats) {
          console.log(allStats);
          expect(allStats[0].newRepos).to.be(1);
          expect(allStats[0].updatedRepos).to.be(1);
          done();
        });
      };

      var failureCb = function() {};

      ofxProcess.searchAddonsAndUpdateDatabase(successCb, failureCb, 'a');

    });

  });

  describe('then grabs batch of addons to get details', function() {

    // var mock = [];
    // mock.push(new Addon({
    //   fullName: 'new'
    // }));
    // mock.push(new Addon({
    //   fullName: 'old 10',
    //   lastFetchedAt: new Date('10 minutes ago')
    // }));
    // mock.push(new Addon({
    //   fullName: 'old 5',
    //   lastFetchedAt: new Date('5 minutes ago')
    // }));
    // mock.push(new Addon({
    //   fullName: 'old 20',
    //   lastFetchedAt: new Date('20 minutes ago')
    // }));


    it('grabs limited amount of records', function() {});

    it('sorts first by lastFetchedAt === null', function() {});

    it('sorts next by oldest lastFetchedAt', function() {});

  });

});
