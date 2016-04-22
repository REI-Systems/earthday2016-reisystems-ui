!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('AboutCtrl', ['$scope', function ($scope) {

    $scope.title = 'About';

    $document.ready(function() {
      $scope.drawTable();
    });
    
  }]);
}();
