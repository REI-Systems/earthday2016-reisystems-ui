!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('TrendCtrl', ['$scope', '$document', 'AgencyTrends', function($scope, $document, AgencyTrends) {
    $scope.drawTrend = function() {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      angular.forEach($scope.data, function(d) {
        d.date = new Date(d.date);
        d.amountSustainable = +d.amountSustainable;
      });

      var x = d3.time.scale()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.amountSustainable); });

      var svg = d3.select("#trend").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent($scope.data, function(d) { return d.date; }));
      y.domain(d3.extent($scope.data, function(d) { return d.amountSustainable; }));

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

      svg.append("path")
        .datum($scope.data)
        .attr("class", "line")
        .attr("d", line);
    };

    $document.ready(function() {
      AgencyTrends.get(function(data) {
        $scope.data = data['_embedded']['trend'];
        $scope.drawTrend();
      });
    });
  }]);
}();
