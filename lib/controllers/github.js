'use strict';

var GitHubApi = require('github');

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

  function successCb(success) {
    res.send(success);
  };

  function failureCb(error) {
    res.send(error);
  };

  // start the search! Fingers crossed! 
  startSearchingRepos(items, successCb, failureCb);

};



// searchReposAsync
// search api
// - error, rate limit, retry
// - error, other, end this one
//
// - success, push results
// - more repos, push new search

// async



// Call initial search function
//
// @param {array} Array of all collected items
// @param {function} Success function, will end response
// @raram {function} Failure function, which will return error
//

function startSearchingRepos(itemsCollection, successCb, failureCb) {

  github.search.repos({
    q: "ofx"
  }, function(error, success) {
    handleReponse(error, success, itemsCollection, successCb, failureCb)
  });

}


// gets next page by passing result 

function getNextPage(gitRes, itemsCollection, successCb, failureCb) {

  github.getNextPage(gitRes, function(error, success) {
    handleReponse(error, success, itemsCollection, successCb, failureCb)
  });

}


// handle response or initial search OR get next page function
// accepts error and result objects
//

function handleReponse(gitError, gitRes, itemsCollection, successCb, failureCb) {

  if (gitError) {
    console.log('ERROR', gitError);

    // rate limit error, try this again soon
    if (gitError.code === 403) {
      return fireAgainAfterRateLimit(itemsCollection, successCb, failureCb);
    }

    // error that we can't likely fix
    // terminate the process
    else {
      return failureCb(gitError);
    }

  }

  // add to items array
  itemsCollection = itemsCollection.concat(gitRes.items);
  console.log('ADDING', gitRes.items.length, 'ITEM COUNT NOW: ', itemsCollection.length);

  // if we have a next page
  if (github.hasNextPage(gitRes)) {
    console.log('GO TO NEXT PAGE');
    getNextPage(gitRes, itemsCollection, successCb, failureCb)
  }

  // no next page, run success cb
  else {
    console.log('ENDING');
    successCb(itemsCollection);
  }

}

function fireAgainAfterRateLimit(itemsCollection, successCb, failureCb) {

  github.get('rate_limit', function(error, body) {
    console.log('rate_limit ', body);
  });

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


