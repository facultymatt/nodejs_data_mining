var nock = nock = require('nock');

var authParams = 'client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

exports.recentCommits = function() {
  console.log('MMMMMM');
  return nock('https://api.github.com:443')
    .persist()
    .get('/repos/cool/addon/commits?' + authParams)
    .reply(200, [{
      "sha": "b259c637f4969127c8e6e253713ac2871c52fc65",
      "commit": {
        "author": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2014-02-13T16:40:45Z"
        },
        "committer": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2014-02-13T16:40:45Z"
        },
        "message": "ifdef",
        "tree": {
          "sha": "f192b19786f3609425dcaf96729297d27c0eed2a",
          "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/f192b19786f3609425dcaf96729297d27c0eed2a"
        },
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/commits/b259c637f4969127c8e6e253713ac2871c52fc65",
        "comment_count": 0
      },
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/b259c637f4969127c8e6e253713ac2871c52fc65",
      "html_url": "https://github.com/armadillu/ofxAnimatable/commit/b259c637f4969127c8e6e253713ac2871c52fc65",
      "comments_url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/b259c637f4969127c8e6e253713ac2871c52fc65/comments",
      "author": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [{
        "sha": "8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
        "html_url": "https://github.com/armadillu/ofxAnimatable/commit/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d"
      }]
    }, {
      "sha": "8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
      "commit": {
        "author": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2013-09-20T23:30:14Z"
        },
        "committer": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2013-09-20T23:30:14Z"
        },
        "message": "more curves, tweaked example",
        "tree": {
          "sha": "e7827dd3c19aa6f5654860eee75db1e15902458b",
          "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/e7827dd3c19aa6f5654860eee75db1e15902458b"
        },
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/commits/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
        "comment_count": 0
      },
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
      "html_url": "https://github.com/armadillu/ofxAnimatable/commit/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
      "comments_url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d/comments",
      "author": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [{
        "sha": "d2da3756f65966d98b788780529057c1ccbb2757",
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/d2da3756f65966d98b788780529057c1ccbb2757",
        "html_url": "https://github.com/armadillu/ofxAnimatable/commit/d2da3756f65966d98b788780529057c1ccbb2757"
      }]
    }], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:03:10 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4975',
      'x-ratelimit-reset': '1400010913'
    })
    .get('/repos/new/addon/commits?' + authParams)
    .reply(200, [], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:03:10 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4975',
      'x-ratelimit-reset': '1400010913'
    })
    .get('/repos/coolDev/coolAddon/commits?' + authParams)
    .reply(200, [{
      "sha": "b259c637f4969127c8e6e253713ac2871c52fc65",
      "commit": {
        "author": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2014-02-13T16:40:45Z"
        },
        "committer": {
          "name": "Oriol Ferrer Mesià",
          "email": "oriol@uri.cat",
          "date": "2014-02-13T16:40:45Z"
        },
        "message": "ifdef",
        "tree": {
          "sha": "f192b19786f3609425dcaf96729297d27c0eed2a",
          "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/f192b19786f3609425dcaf96729297d27c0eed2a"
        },
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/commits/b259c637f4969127c8e6e253713ac2871c52fc65",
        "comment_count": 0
      },
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/b259c637f4969127c8e6e253713ac2871c52fc65",
      "html_url": "https://github.com/armadillu/ofxAnimatable/commit/b259c637f4969127c8e6e253713ac2871c52fc65",
      "comments_url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/b259c637f4969127c8e6e253713ac2871c52fc65/comments",
      "author": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "armadillu",
        "id": 167057,
        "avatar_url": "https://avatars.githubusercontent.com/u/167057?",
        "gravatar_id": "b87a82d7c86161432ee6388c7cbd5e2c",
        "url": "https://api.github.com/users/armadillu",
        "html_url": "https://github.com/armadillu",
        "followers_url": "https://api.github.com/users/armadillu/followers",
        "following_url": "https://api.github.com/users/armadillu/following{/other_user}",
        "gists_url": "https://api.github.com/users/armadillu/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/armadillu/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/armadillu/subscriptions",
        "organizations_url": "https://api.github.com/users/armadillu/orgs",
        "repos_url": "https://api.github.com/users/armadillu/repos",
        "events_url": "https://api.github.com/users/armadillu/events{/privacy}",
        "received_events_url": "https://api.github.com/users/armadillu/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [{
        "sha": "8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
        "url": "https://api.github.com/repos/armadillu/ofxAnimatable/commits/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d",
        "html_url": "https://github.com/armadillu/ofxAnimatable/commit/8bf7fd0d5cccb4ce7d5a170dbfe5f066ecfdfb3d"
      }]
    }], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:03:10 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4975',
      'x-ratelimit-reset': '1400010913'
    });
};
