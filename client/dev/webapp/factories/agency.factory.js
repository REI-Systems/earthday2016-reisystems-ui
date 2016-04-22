!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.factory('Agencies', ['$resource', 'FPDS_CONSTANTS', function($resource, FPDS_CONSTANTS) {
    return $resource(FPDS_CONSTANTS['AGENCIES_ENDPOINT'], null, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }]);
}();
