'use strict';

var client = require('../ofxaddons/index').client;
var _ = require('lodash');
var async = require('async');

// Searches github API recursively getting all pages until
// there are no more results
//
exports.findAllRepos = function(req, res) {

  exports.searchAlphabetAysnc(function(repos, stats) {
    res.send({
      stats: stats,
      repos: repos
    })
  }, function(error) {
    res.send(error, 500);
  });

};


// Searches github API using alphabet and async to kill on performance! 
//
// For each letter of the alphabet, queues a task that will search 
// paginated results. Results are returned and combined into single array.
// Searches that timeout will automatically retry after given time. 
// Queue is processed in parallel using async library. 
//
// @param {function(array, array)} Called on success with repos and stats
// @param {function(object)} Called on error with message
//

exports.searchAlphabetAysnc = function(searchSuccess, searchFailure) {

  // object to hold all results and stats for each letter
  // this will be passed amongst the async functions
  // as then run and return success
  var items = {};

  // base query
  var query = {
    q: "ofx",
    page: 1,
    per_page: 2
  };

  //var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
  var alphabet = ("a").split("");

  // async will run on all objects pushed into queue
  var q = async.queue(function(task, callback) {

    // create new query in scope
    var newQuery = _.assign({}, query);

    // append search letter to query
    newQuery.q += task.letter;

    // our return object will contain stats on letter and all
    // items for all pages
    //
    // @note while this format adds a bit of extra work on success
    // to separate the stats from repos, but the goal is to make it easier
    // to flag letters as having incomplete results, making it easier
    // to requery only those items that are invalid.
    // 
    var itemsAndStats = {
      items: [],
      stats: {
        letter: task.letter,
        pages: 0,
        per_page: newQuery.per_page,
        total_count: 0,
        incomplete_results: false // will be true if any page was corrupt
      }
    };

    // add to our main items array when complete
    var onSuccess = function(allItemsAndStats) {
      items[task.letter] = allItemsAndStats;
      callback();
    };

    // on failure we kill queue and return failure
    var onFailure = function(details) {
      q.kill();
      return searchFailure({
        message: 'Queue was killed due to error from github',
        details: details
      });
    };

    // start search
    startSearchingRepos(newQuery, itemsAndStats, onSuccess, onFailure);

  }, alphabet.length);

  // called when last queued item is sent to worker
  q.empty = function() {
    console.log('empty');
  };

  // called when last queued process in finished
  q.drain = function() {
    console.log('drain');
    queueSuccess();
  };

  // add all the alphabets!
  _.each(alphabet, function(letter) {
    q.push({
      letter: letter
    }, function(err) {
      console.log('finished processing ' + letter);
    });
  });

  // called with async queue drains
  // returns repo array and stats array

  function queueSuccess() {
    var stats = [];
    var allItems = [];
    _.each(items, function(item) {
      stats.push(item.stats);
      allItems = allItems.concat(item.items);
    });
    stats = _.sortBy(stats, 'letter');
    return searchSuccess(allItems, stats);
  }

};


// Call initial search function
//
// @param {object} Query parameters used in search
// @param {array} Array of all collected items
// @param {function} Success function, passed itemCollection array
// @raram {function} Failure function, passed error from github
//

function startSearchingRepos(query, itemsAndStats, successCb, failureCb) {

  // copy the params into a new object because the octonode library
  // modifies them and deletes the q variable
  var queryParams = _.assign({}, query);

  console.log('START SEARCH', queryParams);

  // search github, calling response handler when complete with
  // the original item collection, successCb, and failureCb
  // there might be a more elegant way pass these between functions 
  // but this works for now :)
  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsAndStats, successCb, failureCb);
  });

}


// Gets next page by adding +1 to the query.page number
// 
// @param {object} Must have .page property, which will be incremented by 1
// @param {array} Array of all items collected thus far in which to push new results 
// @param {function} Called after getting all pages
// @param {function} Called if any page request fails in non-timeout error

function getNextPage(query, itemsAndStats, successCb, failureCb) {

  // increment page in query we pass between functions
  // and then make local copy of params so q is not deleted
  query.page++;
  var queryParams = _.assign({}, query);

  console.log('GO TO NEXT PAGE', queryParams);

  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsAndStats, successCb, failureCb);
  });

}


// handle response from initial search OR from get next page function
//
// @todo compare length of items with expected length of total_items
//
// @param {object} Error status code, message, from github
// @param {object} Body from github
// @param {object} Headers from github as object
// @param {query} Query used in last call
// @param {array} Collection of all items thus far
//
// @param {function} Called after getting all pages
// @param {function} Called if any page request fails in non-timeout error
//

function handleReponse(err, body, header, query, itemsAndStats, successCb, failureCb) {

  if (err) {

    // timeout error, we can handle this by waiting a few seconds
    // and then trying again
    if (err.statusCode === 403) {

      // decrement page count since we didn't 
      // get any return from that page
      query.page--;

      // grab reset time from headers and call again later
      var resetTime = err.headers['x-ratelimit-reset'];
      return callAfterGivenTime(resetTime, getNextPage, [query, itemsAndStats, successCb, failureCb]);
    }

    // terminal error, end the whole process 
    else {
      return failureCb(err);
    }

  }

  // add to items array
  itemsAndStats.items = itemsAndStats.items.concat(body.items);
  console.log('ADDING', body.items.length, 'ITEM COUNT NOW: ', itemsAndStats.items.length);

  // check for incomplete results (sign of timeout and partial return)
  if (body.incomplete_results === true) {
    itemsAndStats.stats.incomplete_results = true;
  }

  // check items returned against the per_page param
  // if they equal then we can assume there is another page
  // @note it would be more exact to check the next query param
  // link from the headers as it would avoid an extra API call in some cases
  if (body.items && body.items.length >= query.per_page) {
    return getNextPage(query, itemsAndStats, successCb, failureCb)
  }

  // no next page, run success cb
  else {
    itemsAndStats.stats.total_count = body.total_count; // total results for this query
    itemsAndStats.stats.pages = query.page; // store total pages for this search
    return successCb(itemsAndStats);
  }
}


// Runs a function after given time, optionally applying args 
// Useful when github returns timeout and we need to call back later
//
// @param {timestamp} resetTime, Included in header from github, time when reset ends
// @param {function} fn, Function to be called when time is ennded
// @param {array} args, Array of arguments called with function
//

function callAfterGivenTime(resetTime, fn, args) {

  resetTime = new Date(parseInt(resetTime) * 1000).getTime();
  var nowTime = new Date().getTime();
  var diffTime = resetTime - nowTime;

  console.log("API rate limit exceeded, retrying in " + diffTime / 1000 + " seconds");

  setTimeout(function() {
    fn.apply(null, args);
  }, diffTime);

}








// fin
