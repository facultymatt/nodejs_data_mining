var nock = nock = require('nock');

var authParams = '&client_id=949b776f9fc88851972e&client_secret=4793f09a0189098c72bcded04945c65d0f3a3001';

exports.auth = function() {
  return authParams;
};

exports.lame = function() {
  return nock('https://api.github.com:443')
    .get('/repos/lame/addon/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "file.md",
      "path": "file.md"
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

exports.altMakeFile = function() {
  return nock('https://api.github.com:443')
    .get('/repos/alt/makefile/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "addon.make",
      "path": "addon.make"
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


// Fake limit from server to given url
// after hitting this will be removed from nock interceptor 
// list so the next call will hit your desired response. 
// 
exports.requestLimit = function() {

  // fake timeout from server by 
  var timeout = Math.round(+new Date() / 1000) + 1; // adds 1 second

  return nock('https://api.github.com:443')
    .get('/repos/request/limit/contents/?ref=master' + authParams)
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
    .get('/repos/request/limit/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "file.md",
      "path": "file.md"
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

exports.ofxAnimatable = function() {
  return nock('https://api.github.com:443')
    .get('/repos/armadillu/ofxAnimatable/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "ReadMe.md",
      "path": "ReadMe.md"
    }, {
      "name": "example",
      "path": "example"
    }, {
      "name": "install.xml",
      "path": "install.xml"
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png"
    }, {
      "name": "src",
      "path": "src"
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

exports.ofxAudioUnit = function() {
  return nock('https://api.github.com:443')
    .get('/repos/admsyn/ofxAudioUnit/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "addon_config.mk",
      "path": "addon_config.mk"
    }, {
      "name": "changelog.md",
      "path": "changelog.md"
    }, {
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
    }, {
      "name": "example-5-rendering",
      "path": "example-5-rendering"
    }, {
      "name": "license.txt",
      "path": "license.txt"
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png"
    }, {
      "name": "readme.md",
      "path": "readme.md"
    }, {
      "name": "src",
      "path": "src"
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

exports.ofxARDrone = function() {
  return nock('https://api.github.com:443')
    .get('/repos/memo/ofxARDrone/contents/?ref=master' + authParams)
    .reply(200, [{
      "name": "ReadMe.md",
      "path": "ReadMe.md"
    }, {
      "name": "example",
      "path": "example"
    }, {
      "name": "install.xml",
      "path": "install.xml"
    }, {
      "name": "ofxaddons_thumbnail.png",
      "path": "ofxaddons_thumbnail.png"
    }, {
      "name": "src",
      "path": "src"
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
