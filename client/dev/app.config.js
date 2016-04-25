;(function(ng) {
  'use strict';

  ng.module('app')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'webapp/templates/home.html',
          controller: 'HomeCtrl'
        })
        .when('/about', {
          templateUrl: 'webapp/templates/about.html',
          controller: 'AboutCtrl'
        })
        .when('/agency/:agencyName', {
          templateUrl: 'webapp/templates/agency.html',
          controller: 'AgencyCtrl'
        })
        .when('/map', {
          templateUrl: 'webapp/templates/map.html',
          controller: 'MapCtrl'
        })
        .when('/bubble', {
          templateUrl: 'webapp/templates/bubble.html',
          controller: 'BubbleCtrl'
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
        .accentPalette('amber');
    });
}(window.angular));
