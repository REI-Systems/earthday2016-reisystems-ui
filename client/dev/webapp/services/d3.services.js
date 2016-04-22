!function () {
  'use strict';

  var myApp = angular.module('app');

  myApp.service('d3Service', [function() {
    this.colorScale = d3.scale.linear()
      .domain([0, 100])
      .range(["#E3F2FD", "#1A237E"]);
  }]);
}();
