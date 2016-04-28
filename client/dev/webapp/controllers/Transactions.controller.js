!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('TransactionsCtrl', ['$scope', '$document', '$routeParams', 'Agencies', 'Transactions',
    function ($scope, $document, $routeParams, Agencies, Transactions) {

      $scope.currentAgencyAbbreviation =  $routeParams.agency;
      $scope.drawTable = function () {
        //pagination vars
        $scope.currentPage = 1;
        $scope.perPage = 10;
        $scope.offset = 0;

        var agency = false;

        Agencies.get(function (data) {
          var agencies = data['_embedded']['spending'];
          angular.forEach(agencies, function (agency) {
            if ($scope.currentAgencyAbbreviation == agency.context.abbreviation) {
              $scope.agencyIdentifier = agency.context.identifier;
              Transactions.get({agencyId: agency.context.identifier}, function (data) {
                $scope.agency = agency;
                $scope.rows = data._embedded.transactions;
              });
              return;
            }
          });
        });
      };

      $scope.nextPage = function (){
        console.log('next page');
        $scope.offset = $scope.currentPage*$scope.perPage;
        Transactions.get({agencyId: $scope.agencyIdentifier, offset: $scope.offset}, function (data) {
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
        Transactions.get({agencyId: $scope.agencyIdentifier, offset: $scope.offset}, function (data) {
            $scope.rows = data._embedded.transactions;
        });
      };

      $document.ready(function () {
        $scope.drawTable();
      });
    }]);
}();
