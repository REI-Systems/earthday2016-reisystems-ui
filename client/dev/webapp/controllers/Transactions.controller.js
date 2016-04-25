!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('TransactionsCtrl', ['$scope', '$document', '$routeParams', 'Agencies', 'Transactions',
    function ($scope, $document, $routeParams, Agencies, Transactions) {

      var currentAgencyAbbreviation = $routeParams.agency;

      $scope.drawTable = function () {
        //pagination vars
        $scope.currentPage = 1;
        $scope.perPage = 20;

        var agency = false;

        Agencies.get(function (data) {
          var agencies = data['_embedded']['spending'];
          angular.forEach(agencies, function (agency) {
            if (currentAgencyAbbreviation == agency.context.abbreviation) {
              Transactions.get({agency: agency.context.identifier}, function (data) {
                $scope.rows = data._embedded.transactions;
              });
              return;
            }
          });
        });
      };

      $document.ready(function () {
        $scope.drawTable();
      });
    }]);
}();
