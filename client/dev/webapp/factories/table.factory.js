!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.factory('TableFactory', ['$http', function($http) {
    var apiEndPoint = 'https://earthday2016-reisystems.herokuapp.com/api/v1/';

    return {

        getAgencies: function (limit, page, sort) {
            var offset = (page-1)*limit;
            return $http({
                method: 'GET',
                url: apiEndPoint + 'fpds',
                params: {
                    limit: limit,
                    offset: offset,
                    sort: sort
                }
            }).then(function (response) {
                return response.data;
            });
        },

        getStates: function (limit, page, sort) {
            var offset = (page-1)*limit;
            return $http({
                method: 'GET',
                url: apiEndPoint + 'fpds/sustainability/states',
                params: {
                    limit: limit,
                    offset: offset,
                    sort: sort
                }
            }).then(function (response) {
                return response.data;
            });
        }
    };
  }]);
}();
