!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('TrendCtrl', ['$scope', '$document', 'AgencyTrends', function($scope, $document, AgencyTrends) {
    $scope.drawTrend = function() {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      angular.forEach($scope.data, function(d) {
        d.amount = +d.amount;
        d.date = new Date("01-01-" + d.year);
      });

      var x = d3.time.scale().range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.amount); });

      var svg = d3.select("#trend").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent($scope.data, function(d) { return d.date; }));
      y.domain(d3.extent($scope.data, function(d) { return d.amount; }));

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
        .text("% Amount Sustainable");

      svg.append("path")
        .datum($scope.data)
        .attr("class", "line")
        .attr("d", line);
    };

    $document.ready(function() {
      AgencyTrends.get(function(data) {
        var d = [];

        angular.forEach(data['_embedded']['trend'], function(c) {
          d.push({
            amount: d3.format('.2f')((c['amountSustainable'] / c['amount']) * 100),
            year: c.year
          });
        });
        d.sort(function(x, y){
          return d3.ascending(x.year, y.year);
        });
        $scope.data = d;
        $scope.drawTrend();
      });
    });
  }]);
}();
