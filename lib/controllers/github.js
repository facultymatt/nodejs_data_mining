'use strict';

var GitHubApi = require('github');
var _ = require('lodash');

var github = new GitHubApi({
  version: "3.0.0",
  debug: true,
  timeout: 5000
});

// Auth
// @todo (matt) move to config and process vars to not expose in git!
github.authenticate({
  type: "oauth",
  key: "949b776f9fc88851972e",
  secret: "4793f09a0189098c72bcded04945c65d0f3a3001"
});

// basic follows list from github
exports.demo1 = function(req, res) {
  github.user.getFollowingFromUser({
    user: "facultymatt"
  }, function(gitError, gitRes) {

    if (gitError) return res.json(gitError);

    res.json(gitRes);

  });
};

// begins async search of github api
//
// will collect all the items returned. Supports pagination.
// will retry calls that fail due to rate limit 
//
exports.demo2 = function(req, res) {

  // array to hold all results
  // this will be passed amongst the async functions
  // as then run and return success
  var items = [];
  var query = {
    q: "ofx",
    page: 1,
    per_page: 1
  };

  function successCb(success) {
    res.send(success);
  };

  function failureCb(error) {
    res.send(error);
  };

  // start the search! Fingers crossed! 
  startSearchingRepos(query, items, successCb, failureCb);

};



// searchReposAsync
// search api
// - error, rate limit, retry
// - error, other, end this one
//
// - success, push results
// - more repos, push new search

// async



// demo with octonode since
// the github module (above) doesn't support per_page
var OctoGitHubApi = require('octonode');

var client = OctoGitHubApi.client({
  id: '949b776f9fc88851972e',
  secret: '4793f09a0189098c72bcded04945c65d0f3a3001'
});


// Call initial search function
//
// @param {array} Array of all collected items
// @param {function} Success function, will end response
// @raram {function} Failure function, which will return error
//

function startSearchingRepos(query, itemsCollection, successCb, failureCb) {

  // copy the params into a new object because the octonode library
  // modifies them and deletes the q variable
  var queryParams = _.assign({}, query);

  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb)
  });

}


// gets next page by passing result 

function getNextPage(query, itemsCollection, successCb, failureCb) {

  // increment page in query we pass between functions
  // and then make local copy of params so q is not deleted
  query.page++;
  var queryParams = _.assign({}, query);

  client.search().repos(queryParams, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb)
  });

}


// handle response or initial search OR get next page function
// accepts error and result objects
//

function handleReponse(err, body, header, query, itemsCollection, successCb, failureCb) {

  if (err) {

    if (err.statusCode === 403) {

      // decrement page count since we didn't get any return from that page
      query.page--;

      var resetTime = err.headers['x-ratelimit-reset'];
      return repeatAfterRateLimitReset(resetTime, getNextPage, [query, itemsCollection, successCb, failureCb]);
    } else {
      return failureCb(err);
    }

  }

  // add to items array
  itemsCollection = itemsCollection.concat(body.items);
  console.log('ADDING', body.items.length, 'ITEM COUNT NOW: ', itemsCollection.length);

  // check items returned against the per_page param
  // if they equal then we can assume there is another page
  // @note it would be more exact to check the next query param
  // link from the headers as it would avoid an extra API call in some cases
  if (body.items.length >= query.per_page) {
    console.log('GO TO NEXT PAGE', query);
    return getNextPage(query, itemsCollection, successCb, failureCb)
  }

  // no next page, run success cb
  else {
    console.log('ENDING');
    return successCb(itemsCollection);
  }
}



function repeatAfterRateLimitReset(resetTime, fn, args) {

  // reset time is included in headers as timestamp
  // when request cam be completed. 

  var resetTime = new Date(parseInt(resetTime) * 1000).getTime();
  var nowTime = new Date().getTime();
  var diffTime = resetTime - nowTime;

  console.log("API rate limit exceeded, retrying in " + diffTime/1000 + " seconds...");

  setTimeout(function() {
    //console.log('Timeout done, trying again...');
    fn.apply(null, args);
  }, diffTime);

}



// function handleError(err, q, callee, args) {
//   var diff, reset, today;
//   diff = -1;
//   if (err.message && err.message.indexOf('rate limit exceeded') > -1) {
//     reset = new Date(parseInt(err.headers['x-ratelimit-reset']) * 1000);
//     today = new Date();
//     diff = reset.getTime() - today.getTime();
//     console.log(("→ API rate limit exceeded, retrying in " + (diff / 1000) + " seconds...").yellow);
//   } else {
//     console.log('ERROR:'.red);
//     console.log(("→ for query : " + q).yellow);
//     console.log(err);
//     if (true || err.code === 'ECONNRESET') {
//       diff = 1000;
//       console.log(("→ retrying in " + (diff / 1000) + " seconds...").yellow);
//     }
//   }
//   return setTimeout(function() {
//     return callee.apply(null, args);
//   }, diff);
// };







// Search api
exports.demo3 = function(req, res) {

  var page = 1;


};
