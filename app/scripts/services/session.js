'use strict';

angular.module('ofxSearchApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
