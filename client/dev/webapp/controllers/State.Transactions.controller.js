!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('StateTransactionsCtrl', ['$scope', '$document', '$routeParams', 'Agencies', 'StateTransactions',
    function ($scope, $document, $routeParams, Agencies, StateTransactions) {

      var currentStateAbbreviation = $routeParams.state;

      $scope.drawTable = function () {
        //pagination vars
        $scope.currentPage = 1;
        $scope.perPage = 10;
        $scope.offset = 0;

        StateTransactions.get({stateCode: currentStateAbbreviation}, function (data) {
            $scope.count = data._embedded.count;
            $scope.rows = data._embedded.transactions;
        });
      return;
      };

      $scope.nextPage = function (){
        console.log('next page');
        $scope.offset = $scope.currentPage*$scope.perPage;
        StateTransactions.get({stateCode: currentStateAbbreviation, offset: $scope.offset},
        function (data) {
            $scope.count = data._embedded.count;
            $scope.rows = data._embedded.transactions;
        });
        $scope.currentPage++;
      };

      $scope.prevPage = function (){
        console.log('prev page');
        if($scope.currentPage>1){
            $scope.currentPage--;
        }

        $scope.offset = ($scope.currentPage-1)*$scope.perPage;
        StateTransactions.get({stateCode: currentStateAbbreviation, offset: $scope.offset},
        function (data) {
            $scope.count = data._embedded.count;
            $scope.rows = data._embedded.transactions;
        });
      };

      $document.ready(function () {
        $scope.drawTable();
      });
    }]);

}();
