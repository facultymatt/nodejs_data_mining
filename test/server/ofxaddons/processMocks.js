var nock = nock = require('nock');

var authParams = '&client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

exports.details = function() {
  return nock('https://api.github.com:443')
    .get('/repos/cool/addon/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "example-1-hello",
      "path": "example-1-hello"
    }, {
      "name": "example-2-oscilloscope",
      "path": "example-2-oscilloscope"
    }, {
      "name": "example-3-busses",
      "path": "example-3-busses"
    }, {
      "name": "example-4-parameters",
      "path": "example-4-parameters"
    }], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:05:32 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4967',
      'x-ratelimit-reset': '1400010913'
    });
};

exports.search = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 1,
      "incomplete_results": false,
      "items": [{
        "id": 10629176,
        "name": "ofxAVFVideoPlayer",
        "full_name": "cool/addon",
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
};

exports.searchAndFindNew = function() {
  return nock('https://api.github.com:443')
    .get('/search/repositories?page=1&per_page=2' + authParams + '&q=ofxa')
    .reply(200, {
      "total_count": 2,
      "incomplete_results": false,
      "items": [{
        "id": 10629176,
        "name": "ofxAVFVideoPlayer",
        "full_name": "cool/addon",
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
        "full_name": "new/addon",
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
};