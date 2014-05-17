'use strict';

var should = require('should'),
  expect = require('expect.js'),
  mongoose = require('mongoose'),
  Stat = mongoose.model('Stat');

var stat, report;

describe('Stat Model', function() {

  report = [{
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
  }];

  beforeEach(function(done) {

    var reportTime = new Date();

    stat = new Stat({
      report: report
    });

    // remove all stats from database
    // @Note should be using test database for testing :)
    Stat.remove().exec();
    done();
  });

  afterEach(function(done) {
    Stat.remove().exec();
    done();
  });

  it('should have createdAt property', function(done) {
    var date = new Date();
    stat.save(function(err) {
      expect(stat.createdAt).not.to.eql(undefined);
      done();
    });
  });

  it('should have updatedAt property', function(done) {
    var date = new Date();
    stat.save(function(err) {
      expect(stat.updatedAt).not.to.eql(undefined);
      done();
    });
  });

  it('it has a report', function(done) {
    expect(stat.report[0]).to.eql(report[0]);
    expect(stat.report[1]).to.eql(report[1]);
    done();
  });

  it('has a start date', function(done) {
    var date = new Date();
    stat.save(function(err) {
      expect(stat.start).to.be.a(Date);
      done();
    });
  });

  it('has a stop date', function(done) {
    var date = new Date();
    stat.save(function(err) {
      expect(stat.stop).to.be.a(Date);
      done();
    });
  });

  it('has a default type of `batch_search_all_repos`', function(done) {
    expect(stat.type).to.eql('batch_search_all_repos');
    done();
  });

  it('can also have type `batch_get_repo_details`', function(done) {
    stat.type = 'batch_fetch_repo_details';
    stat.save(function(err) {
      expect(stat.type).to.eql('batch_fetch_repo_details');
      done();
    });
  });

  it('throws error if not a valid type', function(done) {
    stat.type = 'some_invalid_type';
    stat.save(function(err, newStat) {
      expect(err).not.to.be(null);
      done();
    });
  });

});




// fin
