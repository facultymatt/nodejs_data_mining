'use strict';

// The following demonstrates a new pattern for searching github for 
// ofxAddons. The compiles list of addons is used to populate a 
// database and serve the ofxAddons.com website. The new pattern
// is more robust and scalable then current approaches. 
//
// BACKGROUND
//
// The current strategy used by the ofxAddons site is to perform one big
// search and find all repos that begin with `ofx`. This is approx 1,700 
// as of May, 2014. However Github limits search results to 1,000 max results. 
// Thus the current search strategy fails to return almost half of the addons. 
// 
// Another strategy developed by @kikko and outlined 
// here: https://gist.github.com/kikko/10961979 
// breaks the searches into years. This means each year is now 
// limited to 1,000 results. With the current ofxAddon count, this 
// works to catch all addons. 
//
// However this strategy is not without flaws. OpenFrameworks has become
// increasingly popular in past years, with the number of addons being created
// reaching into the hundreds. Where as the early years might have less than
// 100 total per year. It's not unrealistic that the year 2014 could see on
// average 3 new addons per day - putting us over the 1000 limit for the year.
//
// PROPOSED STRATEGY: REPOS
//
// The proposed strategy breaks searches down alphabetically. We first start
// with `ofxa`, then `ofxb`, then `ofxc`, etc. Compared to years, addons names
// should be more normalized even as their rate of creation increases. This
// approach gives us a max of 1,000 per letter. 
//
// Numbers (Max results over 10 years) 
//
// The following take into account GitHubs special 20 request
// per minute limit of search API (normal api is 5000). 
// 
// Proposed: 
// 1,000 max x 26 letters = 26,000 results
// 26 letters x (1,000 results / 100 max per request) = 260 max requests
// 260 requests / 20 max requests per minute = 13 minutes max 
// 
// Current: 
// 1,000 max x 10 years = 10,000 results
// 10 years x (1,000 results / 100 max per request) = 100 max requests
// 100 requests / 20 max requests per minute = 5 minutes max
//
// PROPOSED STRATEGY: FORKS
//
// The current ofxAddons site lists forks along with each repos.
// For now I'll ignore forks since as they only serve to clutter page until
// a solid use case can be formed. 
//
// PROPOSED STRATEGY: DETAILS
// 
// 
// 
// 
// NOTES
//
// In actual production, this method would be run periodically
// by a worker. Here we expose it under a URL endpoint for easy testing. 
//

var OctoGitHubApi = require('octonode');

// Authenticate with github
var client = OctoGitHubApi.client({
  id: '949b776f9fc88851972e',
  secret: '4793f09a0189098c72bcded04945c65d0f3a3001'
});

// module API
exports.client = client;

exports.findAllReposAsync =
  require('../ofxaddons/githubSearch').findAllReposAsync;

exports.searchAlphabetAysnc =
  require('../ofxaddons/githubSearch').searchAlphabetAysnc;

exports.getDetailsForRepoArrayAsync =
  require('../ofxaddons/githubRepoDetail').getDetailsForRepoArrayAsync;



// add tests for searching
// add parse function for search
// add model for repo
// add 







// fin
