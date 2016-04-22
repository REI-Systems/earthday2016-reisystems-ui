;(function(ng) {
  'use strict';

  ng.module('app')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'webapp/templates/HelloWorld.html',
          controller: 'HelloWorldCtrl',
          controllerAs: 'hwCtrl'
        })
        .when('/map', {
          templateUrl: 'webapp/templates/map.html',
          controller: 'MapCtrl'
        })
        .when('/table', {
          templateUrl: 'webapp/templates/table.html',
          controller: 'TableCtrl'
        })
        .otherwise({redirectTo: '/'});
    }])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }]);
}(window.angular));
