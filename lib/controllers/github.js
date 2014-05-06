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

  client.search().repos(query, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb)
  });

}


// gets next page by passing result 

function getNextPage(query, itemsCollection, successCb, failureCb) {

  console.log(query);
  query.page = {
    q: "ofx",
    page: 1,
    per_page: 1
  }

  client.search().repos(query, function(err, body, header) {
    handleReponse(err, body, header, query, itemsCollection, successCb, failureCb)
  });

}


// handle response or initial search OR get next page function
// accepts error and result objects
//

function handleReponse(err, body, header, query, itemsCollection, successCb, failureCb) {

  if (err) {
    console.log('ERR', err);

    return failureCb(err);

    // // rate limit error, try this again soon
    // if (err.code === 403) {
    //   console.log(gitRes);
    //   return;
    // }

    // // error that we can't likely fix
    // // terminate the process
    // else {
    //   return failureCb(err);
    // }

  }

  // add to items array
  itemsCollection = itemsCollection.concat(body.items);
  console.log('ADDING', body.items.length, 'ITEM COUNT NOW: ', itemsCollection.length);

  // if we have a next page
  if (true) {
    console.log('GO TO NEXT PAGE', query);
    getNextPage(query, itemsCollection, successCb, failureCb)
  }

  // no next page, run success cb
  else {
    console.log('ENDING');
    successCb(itemsCollection);
  }

  //

}


function getPageLinks(headerLink) {
  var links = {};
  if (typeof headerLink != "string")
    return links;

  // link format:
  // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
  headerLink.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function(m, uri, type) {
    links[type] = uri;
  });
  console.log(links);
  return links;
}


function hasNextPage(headerLink) {
  return getPageLinks(headerLink).next;
};



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
