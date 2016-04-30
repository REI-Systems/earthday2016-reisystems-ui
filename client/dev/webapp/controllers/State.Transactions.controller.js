!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('StateTransactionsCtrl', ['$scope', '$document', '$routeParams', 'Agencies', 'StateTransactions',
    function ($scope, $document, $routeParams, Agencies, StateTransactions) {

      var currentStateAbbreviation = $routeParams.state;
      //used for breaking out of foreach loop.
      var BreakException= {};
      var states = {};
      d3.tsv("assets/data/us-county-names.tsv", function(tsv) {
        tsv.forEach(function (d, i) {
            states[d.code] = d.name;
        });
      });


      $scope.drawTable = function () {
        //pagination vars
        $scope.currentPage = 1;
        $scope.perPage = 10;
        $scope.offset = 0;
        $scope.stateName = "";
        StateTransactions.get({stateCode: currentStateAbbreviation}, function (data) {
          $scope.count = data.count;
          $scope.rows = data._embedded.transactions;
          $scope.stateName = states[currentStateAbbreviation];
        });
      };

      $scope.nextPage = function (){
        console.log('next page');
        $scope.offset = $scope.currentPage*$scope.perPage;
        StateTransactions.get({stateCode: currentStateAbbreviation, offset: $scope.offset},
          function (data) {
            $scope.count = data.count;
            $scope.rows = data._embedded.transactions;
            $scope.stateName = states[currentStateAbbreviation];
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
            $scope.count = data.count;
            $scope.rows = data._embedded.transactions;
            $scope.stateName = states[currentStateAbbreviation];
          });
      };

      $document.ready(function () {
        $scope.drawTable();
      });
    }]);

}();
