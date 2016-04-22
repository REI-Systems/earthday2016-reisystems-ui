!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('TableCtrl', ['$scope', '$document', 'TableFactory', function ($scope, $document, TableFactory) {

    $scope.title = 'Data table';

    $scope.drawTable = function() {
      //pagination vars
      $scope.currentPage = 1;
      $scope.perPage = 20;

      TableFactory.getAll().success(function(data){
        $scope.rows = data._embedded.collection;
      });

//      $scope.rows = ;
    }

    $document.ready(function() {
      $scope.drawTable();
    });
  }]);
}();
