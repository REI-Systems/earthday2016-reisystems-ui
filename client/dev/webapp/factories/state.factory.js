!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.constant('FPDS_CONSTANTS', {
    'STATE_ENDPOINT': '//earthday2016-reisystems.herokuapp.com/api/v1/fpds/sustainability/states'
  });

  myApp.factory('StateData', ['$resource', 'FPDS_CONSTANTS', function($resource, FPDS_CONSTANTS) {
    return $resource(FPDS_CONSTANTS['STATE_ENDPOINT'], null, {
      list: {
        method: 'GET',
        isArray: false
      }
    });
  }]);
}();
