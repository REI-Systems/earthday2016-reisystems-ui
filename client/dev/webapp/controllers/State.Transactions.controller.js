!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('StateTransactionsCtrl', ['$scope', '$document', '$routeParams', 'Agencies', 'StateTransactions',
    function ($scope, $document, $routeParams, Agencies, StateTransactions) {

      var currentStateAbbreviation = $routeParams.state;

      $scope.drawTable = function () {
        //pagination vars
        $scope.currentPage = 1;
        $scope.perPage = 20;

        var state = false;

        Agencies.get(function (data) {
          var states = data['_embedded']['spending'];
          StateTransactions.get({stateCode: currentStateAbbreviation}, function (data) {
            $scope.state = state;
            $scope.rows = data._embedded.transactions;
          });
          return;
        });
      };

      $document.ready(function () {
        $scope.drawTable();
      });
    }]);
}();
