'use strict';

var nock = nock = require('nock');

var authParams = '&client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

exports.searchAPage1 = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 4,
      "incomplete_results": false,
      "items": [{
        "id": 10629176,
        "name": "ofxAVFVideoPlayer",
        "full_name": "kronick/ofxAVFVideoPlayer",
        "owner": {
          "login": "kronick",
          "id": 186834,
          "avatar_url": "https://avatars.githubusercontent.com/u/186834?",
          "gravatar_id": "abd0ffdcfe5fea1b2319e61ded9452f0",
          "url": "https://api.github.com/users/kronick",
          "html_url": "https://github.com/kronick"
        },
        "private": false,
        "html_url": "https://github.com/kronick/ofxAVFVideoPlayer",
        "description": "OpenFrameworks addon to support super fast super smooth AV Foundation video playback on OSX 10.7+",
        "fork": false,
        "url": "https://api.github.com/repos/kronick/ofxAVFVideoPlayer",
        "created_at": "2013-06-11T19:34:23Z",
        "updated_at": "2014-05-14T07:12:51Z",
        "pushed_at": "2013-06-14T21:27:41Z",
        "git_url": "git://github.com/kronick/ofxAVFVideoPlayer.git",
        "ssh_url": "git@github.com:kronick/ofxAVFVideoPlayer.git",
        "clone_url": "https://github.com/kronick/ofxAVFVideoPlayer.git",
        "svn_url": "https://github.com/kronick/ofxAVFVideoPlayer",
        "homepage": null,
        "size": 537,
        "stargazers_count": 24,
        "watchers_count": 24,
        "language": "Objective-C",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 25,
        "mirror_url": null,
        "open_issues_count": 2,
        "forks": 25,
        "open_issues": 2,
        "watchers": 24,
        "default_branch": "master",
        "score": 81.75434
      }, {
        "id": 3729574,
        "name": "ofxAnimatable",
        "full_name": "armadillu/ofxAnimatable",
        "owner": {
          "login": "armadillu",
          "id": 167057,
          "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
          "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
          "url": "https://api.github.com/users/armadillu",
          "html_url": "https://github.com/armadillu"
        },
        "private": false,
        "html_url": "https://github.com/armadillu/ofxAnimatable",
        "description": "Set of classes that help setup very simple animations, with curves, repeat modes and barebones scheduling.",
        "fork": false,
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable",
        "created_at": "2012-03-15T15:18:53Z",
        "updated_at": "2014-05-03T10:08:16Z",
        "pushed_at": "2014-02-13T16:41:01Z",
        "git_url": "git://github.com/armadillu/ofxAnimatable.git",
        "ssh_url": "git@github.com:armadillu/ofxAnimatable.git",
        "clone_url": "https://github.com/armadillu/ofxAnimatable.git",
        "svn_url": "https://github.com/armadillu/ofxAnimatable",
        "homepage": "http://uri.cat/",
        "size": 209,
        "stargazers_count": 26,
        "watchers_count": 26,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 11,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 11,
        "open_issues": 0,
        "watchers": 26,
        "default_branch": "master",
        "score": 62.521572
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '28',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa>; rel="next", <https://api.github.com/search/repositories?page=49&per_page=2' + authParams + '&q=ofxa>; rel="last"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9887',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159B:39FF1DB:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': 'a1d8c69b807c8e21f06cad9da377d1b0'
    });
}

exports.searchAPage2 = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 4,
      "incomplete_results": false,
      "items": [{
        "id": 7059599,
        "name": "ofxARDrone",
        "full_name": "memo/ofxARDrone",
        "owner": {
          "login": "memo",
          "id": 144230,
          "avatar_url": "https://avatars.githubusercontent.com/u/144230?",
          "gravatar_id": "b5c0e3c2630097b29680cfeda464024c",
          "url": "https://api.github.com/users/memo",
          "html_url": "https://github.com/memo",
          "followers_url": "https://api.github.com/users/memo/followers",
          "following_url": "https://api.github.com/users/memo/following{/other_user}",
          "gists_url": "https://api.github.com/users/memo/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/memo/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/memo/subscriptions",
          "organizations_url": "https://api.github.com/users/memo/orgs",
          "repos_url": "https://api.github.com/users/memo/repos",
          "events_url": "https://api.github.com/users/memo/events{/privacy}",
          "received_events_url": "https://api.github.com/users/memo/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/memo/ofxARDrone",
        "description": "C++ openFrameworks addon to interface with and control Parrot AR.Drone1 and 2. ",
        "fork": false,
        "url": "https://api.github.com/repos/memo/ofxARDrone",
        "created_at": "2012-12-07T20:40:51Z",
        "updated_at": "2014-05-16T14:39:19Z",
        "pushed_at": "2013-11-12T20:56:59Z",
        "git_url": "git://github.com/memo/ofxARDrone.git",
        "ssh_url": "git@github.com:memo/ofxARDrone.git",
        "clone_url": "https://github.com/memo/ofxARDrone.git",
        "svn_url": "https://github.com/memo/ofxARDrone",
        "homepage": null,
        "size": 145,
        "stargazers_count": 19,
        "watchers_count": 19,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 11,
        "mirror_url": null,
        "open_issues_count": 2,
        "forks": 11,
        "open_issues": 2,
        "watchers": 19,
        "default_branch": "master",
        "score": 56.42066
      }, {
        "id": 10644793,
        "name": "ofxAlembic",
        "full_name": "perfume-dev/ofxAlembic",
        "owner": {
          "login": "perfume-dev",
          "id": 1552555,
          "avatar_url": "https://avatars.githubusercontent.com/u/1552555?",
          "gravatar_id": "0b5b740c444e06b11ac95c3f9a42d650",
          "url": "https://api.github.com/users/perfume-dev",
          "html_url": "https://github.com/perfume-dev",
          "followers_url": "https://api.github.com/users/perfume-dev/followers",
          "following_url": "https://api.github.com/users/perfume-dev/following{/other_user}",
          "gists_url": "https://api.github.com/users/perfume-dev/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/perfume-dev/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/perfume-dev/subscriptions",
          "organizations_url": "https://api.github.com/users/perfume-dev/orgs",
          "repos_url": "https://api.github.com/users/perfume-dev/repos",
          "events_url": "https://api.github.com/users/perfume-dev/events{/privacy}",
          "received_events_url": "https://api.github.com/users/perfume-dev/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/perfume-dev/ofxAlembic",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/perfume-dev/ofxAlembic",
        "created_at": "2013-06-12T14:37:01Z",
        "updated_at": "2014-05-14T11:12:57Z",
        "pushed_at": "2014-05-14T11:12:56Z",
        "git_url": "git://github.com/perfume-dev/ofxAlembic.git",
        "ssh_url": "git@github.com:perfume-dev/ofxAlembic.git",
        "clone_url": "https://github.com/perfume-dev/ofxAlembic.git",
        "svn_url": "https://github.com/perfume-dev/ofxAlembic",
        "homepage": null,
        "size": 57377,
        "stargazers_count": 14,
        "watchers_count": 14,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 12,
        "mirror_url": null,
        "open_issues_count": 1,
        "forks": 12,
        "open_issues": 1,
        "watchers": 14,
        "default_branch": "master",
        "score": 52.40398
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '27',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=3&per_page=2' + authParams + '&q=ofxa>; rel="next", <https://api.github.com/search/repositories?page=49&per_page=2' + authParams + '&q=ofxa>; rel="last", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="first", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="prev"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9269',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159C:4FC4757:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': 'd818ddef80f4c7d10683dd483558952a'
    });
}

exports.searchAPage2Timeout = function() {

  // fake timeout from server by 
  var timeout = Math.round(+new Date() / 1000) + 0.001; // adds sliver of time

  return nock('https://api.github.com:443')
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa')
    .reply(403, {
      "message": "API rate limit exceeded!",
      "documentation_url": "https://developer.github.com/v3/#rate-limiting"
    }, {
      server: 'GitHub.com',
      'content-type': 'application/json; charset=utf-8',
      status: '403 Forbidden',
      'x-ratelimit-limit': '60',
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': timeout
    })
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 4,
      "incomplete_results": false,
      "items": [{
        "id": 7059599,
        "name": "ofxARDrone",
        "full_name": "memo/ofxARDrone",
        "owner": {
          "login": "memo",
          "id": 144230,
          "avatar_url": "https://avatars.githubusercontent.com/u/144230?",
          "gravatar_id": "b5c0e3c2630097b29680cfeda464024c",
          "url": "https://api.github.com/users/memo",
          "html_url": "https://github.com/memo",
          "followers_url": "https://api.github.com/users/memo/followers",
          "following_url": "https://api.github.com/users/memo/following{/other_user}",
          "gists_url": "https://api.github.com/users/memo/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/memo/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/memo/subscriptions",
          "organizations_url": "https://api.github.com/users/memo/orgs",
          "repos_url": "https://api.github.com/users/memo/repos",
          "events_url": "https://api.github.com/users/memo/events{/privacy}",
          "received_events_url": "https://api.github.com/users/memo/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/memo/ofxARDrone",
        "description": "C++ openFrameworks addon to interface with and control Parrot AR.Drone1 and 2. ",
        "fork": false,
        "url": "https://api.github.com/repos/memo/ofxARDrone",
        "created_at": "2012-12-07T20:40:51Z",
        "updated_at": "2014-05-16T14:39:19Z",
        "pushed_at": "2013-11-12T20:56:59Z",
        "git_url": "git://github.com/memo/ofxARDrone.git",
        "ssh_url": "git@github.com:memo/ofxARDrone.git",
        "clone_url": "https://github.com/memo/ofxARDrone.git",
        "svn_url": "https://github.com/memo/ofxARDrone",
        "homepage": null,
        "size": 145,
        "stargazers_count": 19,
        "watchers_count": 19,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 11,
        "mirror_url": null,
        "open_issues_count": 2,
        "forks": 11,
        "open_issues": 2,
        "watchers": 19,
        "default_branch": "master",
        "score": 56.42066
      }, {
        "id": 10644793,
        "name": "ofxAlembic",
        "full_name": "perfume-dev/ofxAlembic",
        "owner": {
          "login": "perfume-dev",
          "id": 1552555,
          "avatar_url": "https://avatars.githubusercontent.com/u/1552555?",
          "gravatar_id": "0b5b740c444e06b11ac95c3f9a42d650",
          "url": "https://api.github.com/users/perfume-dev",
          "html_url": "https://github.com/perfume-dev",
          "followers_url": "https://api.github.com/users/perfume-dev/followers",
          "following_url": "https://api.github.com/users/perfume-dev/following{/other_user}",
          "gists_url": "https://api.github.com/users/perfume-dev/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/perfume-dev/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/perfume-dev/subscriptions",
          "organizations_url": "https://api.github.com/users/perfume-dev/orgs",
          "repos_url": "https://api.github.com/users/perfume-dev/repos",
          "events_url": "https://api.github.com/users/perfume-dev/events{/privacy}",
          "received_events_url": "https://api.github.com/users/perfume-dev/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/perfume-dev/ofxAlembic",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/perfume-dev/ofxAlembic",
        "created_at": "2013-06-12T14:37:01Z",
        "updated_at": "2014-05-14T11:12:57Z",
        "pushed_at": "2014-05-14T11:12:56Z",
        "git_url": "git://github.com/perfume-dev/ofxAlembic.git",
        "ssh_url": "git@github.com:perfume-dev/ofxAlembic.git",
        "clone_url": "https://github.com/perfume-dev/ofxAlembic.git",
        "svn_url": "https://github.com/perfume-dev/ofxAlembic",
        "homepage": null,
        "size": 57377,
        "stargazers_count": 14,
        "watchers_count": 14,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 12,
        "mirror_url": null,
        "open_issues_count": 1,
        "forks": 12,
        "open_issues": 1,
        "watchers": 14,
        "default_branch": "master",
        "score": 52.40398
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '27',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=3&per_page=2' + authParams + '&q=ofxa>; rel="next", <https://api.github.com/search/repositories?page=49&per_page=2' + authParams + '&q=ofxa>; rel="last", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="first", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="prev"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9269',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159C:4FC4757:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': 'd818ddef80f4c7d10683dd483558952a'
    });
}

exports.searchAPage2Error = function() {

  return nock('https://api.github.com:443')
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa')
    .reply(404, {
      "message": "This endpoint not found?"
    }, {
      server: 'GitHub.com',
      'content-type': 'application/json; charset=utf-8',
      status: '404 Not Found'
    });
}

exports.searchAPage2Incomplete = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 4,
      "incomplete_results": true,
      "items": [{
        "id": 7059599,
        "name": "ofxARDrone",
        "full_name": "memo/ofxARDrone",
        "owner": {
          "login": "memo",
          "id": 144230,
          "avatar_url": "https://avatars.githubusercontent.com/u/144230?",
          "gravatar_id": "b5c0e3c2630097b29680cfeda464024c",
          "url": "https://api.github.com/users/memo",
          "html_url": "https://github.com/memo",
          "followers_url": "https://api.github.com/users/memo/followers",
          "following_url": "https://api.github.com/users/memo/following{/other_user}",
          "gists_url": "https://api.github.com/users/memo/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/memo/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/memo/subscriptions",
          "organizations_url": "https://api.github.com/users/memo/orgs",
          "repos_url": "https://api.github.com/users/memo/repos",
          "events_url": "https://api.github.com/users/memo/events{/privacy}",
          "received_events_url": "https://api.github.com/users/memo/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/memo/ofxARDrone",
        "description": "C++ openFrameworks addon to interface with and control Parrot AR.Drone1 and 2. ",
        "fork": false,
        "url": "https://api.github.com/repos/memo/ofxARDrone",
        "created_at": "2012-12-07T20:40:51Z",
        "updated_at": "2014-05-16T14:39:19Z",
        "pushed_at": "2013-11-12T20:56:59Z",
        "git_url": "git://github.com/memo/ofxARDrone.git",
        "ssh_url": "git@github.com:memo/ofxARDrone.git",
        "clone_url": "https://github.com/memo/ofxARDrone.git",
        "svn_url": "https://github.com/memo/ofxARDrone",
        "homepage": null,
        "size": 145,
        "stargazers_count": 19,
        "watchers_count": 19,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 11,
        "mirror_url": null,
        "open_issues_count": 2,
        "forks": 11,
        "open_issues": 2,
        "watchers": 19,
        "default_branch": "master",
        "score": 56.42066
      }, {
        "id": 10644793,
        "name": "ofxAlembic",
        "full_name": "perfume-dev/ofxAlembic",
        "owner": {
          "login": "perfume-dev",
          "id": 1552555,
          "avatar_url": "https://avatars.githubusercontent.com/u/1552555?",
          "gravatar_id": "0b5b740c444e06b11ac95c3f9a42d650",
          "url": "https://api.github.com/users/perfume-dev",
          "html_url": "https://github.com/perfume-dev",
          "followers_url": "https://api.github.com/users/perfume-dev/followers",
          "following_url": "https://api.github.com/users/perfume-dev/following{/other_user}",
          "gists_url": "https://api.github.com/users/perfume-dev/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/perfume-dev/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/perfume-dev/subscriptions",
          "organizations_url": "https://api.github.com/users/perfume-dev/orgs",
          "repos_url": "https://api.github.com/users/perfume-dev/repos",
          "events_url": "https://api.github.com/users/perfume-dev/events{/privacy}",
          "received_events_url": "https://api.github.com/users/perfume-dev/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/perfume-dev/ofxAlembic",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/perfume-dev/ofxAlembic",
        "created_at": "2013-06-12T14:37:01Z",
        "updated_at": "2014-05-14T11:12:57Z",
        "pushed_at": "2014-05-14T11:12:56Z",
        "git_url": "git://github.com/perfume-dev/ofxAlembic.git",
        "ssh_url": "git@github.com:perfume-dev/ofxAlembic.git",
        "clone_url": "https://github.com/perfume-dev/ofxAlembic.git",
        "svn_url": "https://github.com/perfume-dev/ofxAlembic",
        "homepage": null,
        "size": 57377,
        "stargazers_count": 14,
        "watchers_count": 14,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 12,
        "mirror_url": null,
        "open_issues_count": 1,
        "forks": 12,
        "open_issues": 1,
        "watchers": 14,
        "default_branch": "master",
        "score": 52.40398
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '27',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=3&per_page=2' + authParams + '&q=ofxa>; rel="next", <https://api.github.com/search/repositories?page=49&per_page=2' + authParams + '&q=ofxa>; rel="last", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="first", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa>; rel="prev"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9269',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159C:4FC4757:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': 'd818ddef80f4c7d10683dd483558952a'
    });
}

exports.searchBPage1 = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=1&per_page=2' + authParams + '&q=ofxb')
    .reply(200, {
      "total_count": 3,
      "incomplete_results": false,
      "items": [{
        "id": 1254984,
        "name": "ofxBox2d",
        "full_name": "vanderlin/ofxBox2d",
        "owner": {
          "login": "vanderlin",
          "id": 149997,
          "avatar_url": "https://avatars.githubusercontent.com/u/149997?",
          "gravatar_id": "96c91dba0113ea847ee43b0961d24b3a",
          "url": "https://api.github.com/users/vanderlin",
          "html_url": "https://github.com/vanderlin"
        },
        "private": false,
        "html_url": "https://github.com/vanderlin/ofxBox2d",
        "description": "Openframework wrapper for box2d",
        "fork": false,
        "url": "https://api.github.com/repos/vanderlin/ofxBox2d",
        "created_at": "2011-01-14T16:25:28Z",
        "updated_at": "2014-05-16T07:54:42Z",
        "pushed_at": "2014-05-16T07:54:42Z",
        "git_url": "git://github.com/vanderlin/ofxBox2d.git",
        "ssh_url": "git@github.com:vanderlin/ofxBox2d.git",
        "clone_url": "https://github.com/vanderlin/ofxBox2d.git",
        "svn_url": "https://github.com/vanderlin/ofxBox2d",
        "homepage": "",
        "size": 23875,
        "stargazers_count": 148,
        "watchers_count": 148,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 47,
        "mirror_url": null,
        "open_issues_count": 15,
        "forks": 47,
        "open_issues": 15,
        "watchers": 148,
        "default_branch": "master",
        "score": 186.77702
      }, {
        "id": 2019013,
        "name": "ofxBullet",
        "full_name": "NickHardeman/ofxBullet",
        "owner": {
          "login": "NickHardeman",
          "id": 142694,
          "avatar_url": "https://avatars.githubusercontent.com/u/142694?",
          "gravatar_id": "4fc88ba881fee72fc4c5de473dc2ebbf",
          "url": "https://api.github.com/users/NickHardeman",
          "html_url": "https://github.com/NickHardeman"
        },
        "private": false,
        "html_url": "https://github.com/NickHardeman/ofxBullet",
        "description": "Bullet Physics Wrapper for Openframeworks",
        "fork": false,
        "url": "https://api.github.com/repos/NickHardeman/ofxBullet",
        "created_at": "2011-07-08T17:25:15Z",
        "updated_at": "2014-05-14T20:36:46Z",
        "pushed_at": "2014-03-20T20:31:16Z",
        "git_url": "git://github.com/NickHardeman/ofxBullet.git",
        "ssh_url": "git@github.com:NickHardeman/ofxBullet.git",
        "clone_url": "https://github.com/NickHardeman/ofxBullet.git",
        "svn_url": "https://github.com/NickHardeman/ofxBullet",
        "homepage": "",
        "size": 30121,
        "stargazers_count": 48,
        "watchers_count": 48,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 19,
        "mirror_url": null,
        "open_issues_count": 3,
        "forks": 19,
        "open_issues": 3,
        "watchers": 48,
        "default_branch": "master",
        "score": 108.320206
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '29',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=2&per_page=2' + authParams + '&q=ofxb>; rel="next", <https://api.github.com/search/repositories?page=31&per_page=2' + authParams + '&q=ofxb>; rel="last"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9452',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159B:39FF1D9:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': '88d924ed861736d2749ce1a55766cb53'
    });
}

exports.searchBPage2 = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=2&per_page=2' + authParams + '&q=ofxb')
    .reply(200, {
      "total_count": 3,
      "incomplete_results": false,
      "items": [{
        "id": 1022918,
        "name": "ofxBeatTracking",
        "full_name": "zenwerk/ofxBeatTracking",
        "owner": {
          "login": "zenwerk",
          "id": 453347,
          "avatar_url": "https://avatars.githubusercontent.com/u/453347?",
          "gravatar_id": "dbc661d0175af93feee1643a8b66f3c7",
          "url": "https://api.github.com/users/zenwerk",
          "html_url": "https://github.com/zenwerk"
        },
        "private": false,
        "html_url": "https://github.com/zenwerk/ofxBeatTracking",
        "description": "simple beat tracking with openFrameworks.",
        "fork": false,
        "url": "https://api.github.com/repos/zenwerk/ofxBeatTracking",
        "created_at": "2010-10-25T17:09:35Z",
        "updated_at": "2014-01-13T21:39:38Z",
        "pushed_at": "2013-01-31T03:23:14Z",
        "git_url": "git://github.com/zenwerk/ofxBeatTracking.git",
        "ssh_url": "git@github.com:zenwerk/ofxBeatTracking.git",
        "clone_url": "https://github.com/zenwerk/ofxBeatTracking.git",
        "svn_url": "https://github.com/zenwerk/ofxBeatTracking",
        "homepage": "http://www.gamedev.net/reference/programming/features/beatdetection/",
        "size": 117,
        "stargazers_count": 21,
        "watchers_count": 21,
        "language": "C++",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 8,
        "mirror_url": null,
        "open_issues_count": 1,
        "forks": 8,
        "open_issues": 1,
        "watchers": 21,
        "default_branch": "master",
        "score": 44.040207
      }]
    }, {
      server: 'GitHub.com',
      date: 'Sat, 17 May 2014 12:48:45 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '30',
      'x-ratelimit-remaining': '26',
      'x-ratelimit-reset': '1400330985',
      'cache-control': 'no-cache',
      'x-github-media-type': 'github.v3; format=json',
      link: '<https://api.github.com/search/repositories?page=3&per_page=2' + authParams + '&q=ofxb>; rel="next", <https://api.github.com/search/repositories?page=31&per_page=2' + authParams + '&q=ofxb>; rel="last", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxb>; rel="first", <https://api.github.com/search/repositories?page=1&per_page=2' + authParams + '&q=ofxb>; rel="prev"',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '9679',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': '927350AC:159D:600432E:53775AAD',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      vary: 'Accept-Encoding',
      'x-served-by': '62a1303ae95931e56e387e87d354bb24'
    });
}
