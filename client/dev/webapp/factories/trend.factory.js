!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.factory('AgencyTrends', ['$resource', 'FPDS_CONSTANTS', function($resource, FPDS_CONSTANTS) {
    return $resource(FPDS_CONSTANTS['TREND_ENDPOINT'], null, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }]);
}();
