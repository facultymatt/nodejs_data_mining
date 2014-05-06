'use strict';

var OctoGitHubApi = require('octonode');
var _ = require('lodash');
var async = require('async');


// Authenticate with github
//
var client = OctoGitHubApi.client({
  id: '949b776f9fc88851972e',
  secret: '4793f09a0189098c72bcded04945c65d0f3a3001'
});


// Searches github API recursively getting all pages until
// there are no more results
//
exports.search = function(req, res) {

  // array to hold all results
  // this will be passed amongst the async functions
  // as then run and return success
  var items = [];
  var query = {
    q: "ofxa",
    page: 1,
    per_page: 20
  };

  function successCb(success) {
    var mapped = _.map(success, function(repo) {
      return repo.full_name;
    });

    res.send(mapped);
  }

  function failureCb(error) {
    res.send(error);
  }

  // start the search! Fingers crossed! 
  startSearchingRepos(query, items, successCb, failureCb);

};


// Call initial search function
//
// @param {object} Query parameters used in search
// @param {array} Array of all collected items
// @param {function} Success function, passed itemCollection array
// @raram {function} Failure function, passed error from github
//

function startSearchingRepos(query, itemsCollection, successCb, failureCb) {

  // copy the params into a new object because the octonode library
  // modifies them and deletes the q variable
  var queryParams = _.assign({}, query);

  debug('START SEARCH', queryParams);

  // search github, calling response handler when complete with
  // the original item collection, successCb, and failureCb
  // there might be a more elegant way pass these between functions 
  // but this works for now :)
  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb);
  });

}


// gets next page by passing result 

function getNextPage(query, itemsCollection, successCb, failureCb) {

  // increment page in query we pass between functions
  // and then make local copy of params so q is not deleted
  query.page++;
  var queryParams = _.assign({}, query);

  debug('GO TO NEXT PAGE', queryParams);

  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb);
  });

}


// handle response or initial search OR get next page function
// accepts error and result objects
//
// @todo compare length of items with expected length of total_items
//
function handleReponse(err, body, header, query, itemsCollection, successCb, failureCb) {

  if (err) {

    // timeout error, we can handle this by waiting a few seconds
    // and then trying again
    if (err.statusCode === 403) {

      // decrement page count since we didn't 
      // get any return from that page
      query.page--;

      // grab reset time from headers and call again later
      var resetTime = err.headers['x-ratelimit-reset'];
      return callAfterGivenTime(resetTime, getNextPage, [query, itemsCollection, successCb, failureCb]);
    }

    // terminal error, end the whole process 
    else {
      return failureCb(err);
    }

  }

  // add to items array
  itemsCollection = itemsCollection.concat(body.items);
  debug('ADDING', body.items.length, 'ITEM COUNT NOW: ', itemsCollection.length);

  // check items returned against the per_page param
  // if they equal then we can assume there is another page
  // @note it would be more exact to check the next query param
  // link from the headers as it would avoid an extra API call in some cases
  if (body.items && body.items.length >= query.per_page) {
    return getNextPage(query, itemsCollection, successCb, failureCb)
  }

  // no next page, run success cb
  else {
    debug('ENDING');
    return successCb(itemsCollection);
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

  debug("API rate limit exceeded, retrying in " + diffTime / 1000 + " seconds");

  setTimeout(function() {
    fn.apply(null, args);
  }, diffTime);

}


// Private method to debug by logging to console
// 
// @param {string} msg, Message to log to console
//

function debug() {
  console.log(arguments);
}
