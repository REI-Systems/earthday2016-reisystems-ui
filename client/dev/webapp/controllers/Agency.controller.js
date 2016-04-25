!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('AgencyCtrl', ['$scope', '$document', 'Agencies', function ($scope, $document, Agencies) {

    $scope.title = 'Data table';

    $scope.drawTable = function() {
      //pagination vars
      $scope.currentPage = 1;
      $scope.perPage = 20;

      // Agencies.getStates($scope.perPage, $scope.currentPage, 'sort').then(function (response) {
      //       $scope.rows = response._embedded.contextBasedSpendingList;
      //   });

      Agencies.get(function(data) {
        $scope.rows = data['_embedded']['contextBasedSpendingList'];
      });

//      $scope.states = TableFactory.getStates();
//      $scope.states.success(function(data){
//        $scope.rows = data._embedded.contextBasedSpendingList;
//      });

//      $scope.rows = ;

      $scope.pagination = {
          pageSize: 5,
          pageNumber: 1,
          totalItems: null,
          getTotalPages: function () {
              return Math.ceil(this.totalItems / this.pageSize);
          },
          nextPage: function () {
              if (this.pageNumber < this.getTotalPages()) {
                  this.pageNumber++;
                  $scope.load();
              }
          },
          previousPage: function () {
              if (this.pageNumber > 1) {
                  this.pageNumber--;
                  $scope.load();
              }
          }
      };
    }

    $document.ready(function() {
      $scope.drawTable();
    });
  }]);
}();
