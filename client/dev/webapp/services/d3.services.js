!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.service('d3Service', [function() {
    this.colorScale = function (min, max) {
      return d3.scale.linear()
        .domain([min, max])
        .range(["#E3F2FD", "#1A237E"]);
    };
  }]);
}();
