!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.factory('TableFactory', ['$http', function($http) {
    return {
        getAll: function () {
            return $http.get("https://earthday2016-reisystems.herokuapp.com/api/v1/fpds/sustainability/states");
        }
    };
  }]);
}();
