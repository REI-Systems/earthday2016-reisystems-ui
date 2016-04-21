!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('HelloWorldCtrl', ['$scope', function ($scope) {
    $scope.HelloWorld = 'Hello World';
  }]);
}();
