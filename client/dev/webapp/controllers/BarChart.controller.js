!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('BarChartCtrl', ['$scope', '$document', 'Agencies', function($scope, $document, Agencies) {
    $scope.drawBarTrend = function() {

      var data = $scope.data;

      var margin = {top: 10, right: 30, bottom: 200, left: 150},
        width = 950 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
      var y = d3.scale.linear().range([height, 0]);

      angular.forEach($scope.data, function(d) {
        d.amount = (d.amountSustainable / d.amount) * 100;
      });

      x.domain($scope.data.map(function(d) { return d.name; }));
      y.domain([0, d3.max($scope.data, function(d) { return d.amount; })]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(20);

      var svg = d3.select("#homeBarChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 200)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map(function(d) { return d.name; }));
      y.domain([0, d3.max(data, function(d) { return d.amount; })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.4em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sustainable (%)");

      svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return height - y(d.amount); });
    };

    $document.ready(function() {
      Agencies.get(function(data) {
        $scope.data = data['_embedded']['contextBasedSpendingList'];
        $scope.drawBarTrend();
      });
    });
  }]);
}();
