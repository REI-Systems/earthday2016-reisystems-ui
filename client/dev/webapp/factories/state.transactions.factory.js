!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.factory('StateTransactions', ['$resource', 'FPDS_CONSTANTS', function($resource, FPDS_CONSTANTS) {
    return $resource(FPDS_CONSTANTS['STATE_TRANSACTIONS_ENDPOINT'], null, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }]);
}();
