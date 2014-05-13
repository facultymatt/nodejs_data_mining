var nock = nock = require('nock');

var authParams = '&client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

exports.limit = function(url) {

  var timeout = Math.round(+new Date() / 1000) + 1; // adds 1 second

  return nock('https://api.github.com:443')
    .get(url + authParams)
    .reply(403, {
      "message": "API rate limit exceeded!",
      "documentation_url": "https://developer.github.com/v3/#rate-limiting"
    }, {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:37:54 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '403 Forbidden',
      'x-ratelimit-limit': '60',
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': timeout,
      'x-github-media-type': 'github.v3; format=json',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '247',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': 'D0B8484E:3A2C:2DF5637:53727492',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff'
    });

}


exports.nock1 = function() {
  return nock('https://api.github.com:443')
    .get('/repos/armadillu/ofxAnimatable/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "ReadMe.md",
      "path": "ReadMe.md",
      "sha": "761750ceafa3d00524ac3fdda20bec341404571e",
      "size": 863,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ReadMe.md?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/ReadMe.md",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/761750ceafa3d00524ac3fdda20bec341404571e",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ReadMe.md?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/761750ceafa3d00524ac3fdda20bec341404571e",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/ReadMe.md"
      }
    }, {
      "name": "example",
      "path": "example",
      "sha": "d833961a9890aace8091f8da5fb9b0e5345f5fa8",
      "size": 0,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/example?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/tree/master/example",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/d833961a9890aace8091f8da5fb9b0e5345f5fa8",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/example?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/d833961a9890aace8091f8da5fb9b0e5345f5fa8",
        "html": "https://github.com/armadillu/ofxAnimatable/tree/master/example"
      }
    }, {
      "name": "install.xml",
      "path": "install.xml",
      "sha": "89f7692461da6131df28838ef0e1610f70e7f4fd",
      "size": 1485,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/install.xml?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/install.xml",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/89f7692461da6131df28838ef0e1610f70e7f4fd",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/install.xml?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/89f7692461da6131df28838ef0e1610f70e7f4fd",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/install.xml"
      }
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png",
      "sha": "09c36f18cc3b904fd618862265313c0a3f40ed64",
      "size": 2068,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ofxaddons_thumbnail.png?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/ofxaddons_thumbnail.png",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/09c36f18cc3b904fd618862265313c0a3f40ed64",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ofxaddons_thumbnail.png?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/09c36f18cc3b904fd618862265313c0a3f40ed64",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/ofxaddons_thumbnail.png"
      }
    }, {
      "name": "src",
      "path": "src",
      "sha": "6d4db2eaea9f468d77b039c7353d157bfbab09d5",
      "size": 0,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/src?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/tree/master/src",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/6d4db2eaea9f468d77b039c7353d157bfbab09d5",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/src?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/6d4db2eaea9f468d77b039c7353d157bfbab09d5",
        "html": "https://github.com/armadillu/ofxAnimatable/tree/master/src"
      }
    }], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:03:10 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4975',
      'x-ratelimit-reset': '1400010913',
      'cache-control': 'public, max-age=60, s-maxage=60',
      'last-modified': 'Sat, 03 May 2014 10:08:16 GMT',
      etag: '"b1a12cb5df8254cc8014914bcbfbf96f"',
      vary: 'Accept',
      'x-github-media-type': 'github.v3; format=json',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '3485',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': 'D0B8484E:3A2C:2D116E4:53726C6E',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      'x-served-by': '6d7de9e645814cac34ea2a8d72ba3141'
    });
}

exports.nock2 = function() {
  return nock('https://api.github.com:443')
    .get('/repos/admsyn/ofxAudioUnit/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "addon_config.mk",
      "path": "addon_config.mk",
      "sha": "5da527cad6ea1bec6bdfd4cadc92378946458dfc",
      "size": 370,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/addon_config.mk?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/blob/master/addon_config.mk",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/5da527cad6ea1bec6bdfd4cadc92378946458dfc",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/addon_config.mk?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/5da527cad6ea1bec6bdfd4cadc92378946458dfc",
        "html": "https://github.com/admsyn/ofxAudioUnit/blob/master/addon_config.mk"
      }
    }, {
      "name": "changelog.md",
      "path": "changelog.md",
      "sha": "cb484bae169f8b307e02fb14cab51741db96c038",
      "size": 1436,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/changelog.md?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/blob/master/changelog.md",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/cb484bae169f8b307e02fb14cab51741db96c038",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/changelog.md?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/cb484bae169f8b307e02fb14cab51741db96c038",
        "html": "https://github.com/admsyn/ofxAudioUnit/blob/master/changelog.md"
      }
    }, {
      "name": "example-1-hello",
      "path": "example-1-hello",
      "sha": "39a33761d642f22dbce668fe2aed60f6663b298d",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-1-hello?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-1-hello",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/39a33761d642f22dbce668fe2aed60f6663b298d",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-1-hello?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/39a33761d642f22dbce668fe2aed60f6663b298d",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-1-hello"
      }
    }, {
      "name": "example-2-oscilloscope",
      "path": "example-2-oscilloscope",
      "sha": "7faebd35849a522aad7745f81c39ec01639168da",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-2-oscilloscope?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-2-oscilloscope",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/7faebd35849a522aad7745f81c39ec01639168da",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-2-oscilloscope?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/7faebd35849a522aad7745f81c39ec01639168da",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-2-oscilloscope"
      }
    }, {
      "name": "example-3-busses",
      "path": "example-3-busses",
      "sha": "7a0158434f944604e1d761772acae62dd747e242",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-3-busses?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-3-busses",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/7a0158434f944604e1d761772acae62dd747e242",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-3-busses?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/7a0158434f944604e1d761772acae62dd747e242",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-3-busses"
      }
    }, {
      "name": "example-4-parameters",
      "path": "example-4-parameters",
      "sha": "a7b75fce267b7fec45c700cb69a745c7ae3acf02",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-4-parameters?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-4-parameters",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/a7b75fce267b7fec45c700cb69a745c7ae3acf02",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-4-parameters?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/a7b75fce267b7fec45c700cb69a745c7ae3acf02",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-4-parameters"
      }
    }, {
      "name": "example-5-rendering",
      "path": "example-5-rendering",
      "sha": "ba4ac5082e11cdc21662897eb4fd96ea986b5268",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-5-rendering?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-5-rendering",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/ba4ac5082e11cdc21662897eb4fd96ea986b5268",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/example-5-rendering?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/ba4ac5082e11cdc21662897eb4fd96ea986b5268",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/example-5-rendering"
      }
    }, {
      "name": "license.txt",
      "path": "license.txt",
      "sha": "ccb999bf170e1f26ec44a5204816864bb30456f0",
      "size": 1127,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/license.txt?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/blob/master/license.txt",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/ccb999bf170e1f26ec44a5204816864bb30456f0",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/license.txt?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/ccb999bf170e1f26ec44a5204816864bb30456f0",
        "html": "https://github.com/admsyn/ofxAudioUnit/blob/master/license.txt"
      }
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png",
      "sha": "82b3f62bcd288a419abbe1243bef793633ab2667",
      "size": 8710,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/ofxaddons_thumbnail.png?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/blob/master/ofxaddons_thumbnail.png",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/82b3f62bcd288a419abbe1243bef793633ab2667",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/ofxaddons_thumbnail.png?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/82b3f62bcd288a419abbe1243bef793633ab2667",
        "html": "https://github.com/admsyn/ofxAudioUnit/blob/master/ofxaddons_thumbnail.png"
      }
    }, {
      "name": "readme.md",
      "path": "readme.md",
      "sha": "febd8cc6427ac698379bef08a7336e559940390a",
      "size": 2125,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/readme.md?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/blob/master/readme.md",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/febd8cc6427ac698379bef08a7336e559940390a",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/readme.md?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/blobs/febd8cc6427ac698379bef08a7336e559940390a",
        "html": "https://github.com/admsyn/ofxAudioUnit/blob/master/readme.md"
      }
    }, {
      "name": "src",
      "path": "src",
      "sha": "a25bd1b93b5ae86d92c54e86162c3c8f5c7ddd71",
      "size": 0,
      "url": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/src?ref=master",
      "html_url": "https://github.com/admsyn/ofxAudioUnit/tree/master/src",
      "git_url": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/a25bd1b93b5ae86d92c54e86162c3c8f5c7ddd71",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/admsyn/ofxAudioUnit/contents/src?ref=master",
        "git": "https://api.github.com/repos/admsyn/ofxAudioUnit/git/trees/a25bd1b93b5ae86d92c54e86162c3c8f5c7ddd71",
        "html": "https://github.com/admsyn/ofxAudioUnit/tree/master/src"
      }
    }], {
      server: 'GitHub.com',
      date: 'Tue, 13 May 2014 19:05:32 GMT',
      'content-type': 'application/json; charset=utf-8',
      status: '200 OK',
      'x-ratelimit-limit': '5000',
      'x-ratelimit-remaining': '4967',
      'x-ratelimit-reset': '1400010913',
      'cache-control': 'public, max-age=60, s-maxage=60',
      'last-modified': 'Wed, 07 May 2014 15:13:50 GMT',
      etag: '"f951eb713956341aadb5abe3f31ac2bd"',
      vary: 'Accept',
      'x-github-media-type': 'github.v3; format=json',
      'x-xss-protection': '1; mode=block',
      'x-frame-options': 'deny',
      'content-security-policy': 'default-src \'none\'',
      'content-length': '7687',
      'access-control-allow-credentials': 'true',
      'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
      'access-control-allow-origin': '*',
      'x-github-request-id': 'D0B8484E:460F:28E583F:53726CFC',
      'strict-transport-security': 'max-age=31536000',
      'x-content-type-options': 'nosniff',
      'x-served-by': '62a1303ae95931e56e387e87d354bb24'
    });
}


exports.nock3 = function() {
  return nock('https://api.github.com:443')
    .get('/repos/armadillu/ofxAnimatable/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "ReadMe.md",
      "path": "ReadMe.md",
      "sha": "761750ceafa3d00524ac3fdda20bec341404571e",
      "size": 863,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ReadMe.md?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/ReadMe.md",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/761750ceafa3d00524ac3fdda20bec341404571e",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ReadMe.md?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/761750ceafa3d00524ac3fdda20bec341404571e",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/ReadMe.md"
      }
    }, {
      "name": "example",
      "path": "example",
      "sha": "d833961a9890aace8091f8da5fb9b0e5345f5fa8",
      "size": 0,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/example?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/tree/master/example",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/d833961a9890aace8091f8da5fb9b0e5345f5fa8",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/example?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/d833961a9890aace8091f8da5fb9b0e5345f5fa8",
        "html": "https://github.com/armadillu/ofxAnimatable/tree/master/example"
      }
    }, {
      "name": "install.xml",
      "path": "install.xml",
      "sha": "89f7692461da6131df28838ef0e1610f70e7f4fd",
      "size": 1485,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/install.xml?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/install.xml",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/89f7692461da6131df28838ef0e1610f70e7f4fd",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/install.xml?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/89f7692461da6131df28838ef0e1610f70e7f4fd",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/install.xml"
      }
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png",
      "sha": "09c36f18cc3b904fd618862265313c0a3f40ed64",
      "size": 2068,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ofxaddons_thumbnail.png?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/blob/master/ofxaddons_thumbnail.png",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/09c36f18cc3b904fd618862265313c0a3f40ed64",
      "type": "file",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/ofxaddons_thumbnail.png?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/blobs/09c36f18cc3b904fd618862265313c0a3f40ed64",
        "html": "https://github.com/armadillu/ofxAnimatable/blob/master/ofxaddons_thumbnail.png"
      }
    }, {
      "name": "src",
      "path": "src",
      "sha": "6d4db2eaea9f468d77b039c7353d157bfbab09d5",
      "size": 0,
      "url": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/src?ref=master",
      "html_url": "https://github.com/armadillu/ofxAnimatable/tree/master/src",
      "git_url": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/6d4db2eaea9f468d77b039c7353d157bfbab09d5",
      "type": "dir",
      "_links": {
        "self": "https://api.github.com/repos/armadillu/ofxAnimatable/contents/src?ref=master",
        "git": "https://api.github.com/repos/armadillu/ofxAnimatable/git/trees/6d4db2eaea9f468d77b039c7353d157bfbab09d5",
        "html": "https://github.com/armadillu/ofxAnimatable/tree/master/src"
      }
    }]);
}
