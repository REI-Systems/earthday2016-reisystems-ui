!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.constant('FPDS_CONSTANTS', {
    'STATE_ENDPOINT': '//earthday2016-reisystems.herokuapp.com/api/v1/fpds/sustainability/states',
    'TREND_ENDPOINT': '//earthday2016-reisystems.herokuapp.com/api/v1/fpds/sustainability/trend',
    'AGENCIES_ENDPOINT': '//earthday2016-reisystems.herokuapp.com/api/v1/fpds/sustainability/agencies'
  });
}();
