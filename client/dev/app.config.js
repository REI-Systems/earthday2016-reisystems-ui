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
        .when('/bubble', {
          templateUrl: 'webapp/templates/bubble.html',
          controller: 'BubbleCtrl'
        })
        .when('/table', {
          templateUrl: 'webapp/templates/table.html',
          controller: 'TableCtrl'
        })
        .when('/trend', {
          templateUrl: 'webapp/templates/trend.html',
          controller: 'TrendCtrl'
        })
        .otherwise({redirectTo: '/'});
    }])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('light-green');
    });
}(window.angular));
