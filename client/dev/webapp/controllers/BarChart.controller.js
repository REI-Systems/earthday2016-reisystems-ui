!function() {
  'use strict';

  var myApp = angular.module('app');

  myApp.controller('BarChartCtrl', ['$scope', '$document', 'Agencies', 'd3Service', function($scope, $document, Agencies, d3Service) {
    $scope.drawBarTrend = function() {

      var data = $scope.data;

      var margin = {top: 10, right: 30, bottom: 100, left: 150},
        width = 950 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
      var y = d3.scale.linear().range([height, 0]);

      var color = d3Service.colorScale(0, 100);

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Agency:</strong> " + d.name +"<br/><strong>Amount Sustainable:</strong> " + d.amount + "%";
        });

      angular.forEach($scope.data, function(d) {
        d.amount = d3.format('.2f')((d.amountSustainable / d.amount) * 100);
      });

      x.domain($scope.data.map(function(d) { return d.acronym; }));
      y.domain([0, d3.max($scope.data, function(d) { return d.amount; })]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

      var svg = d3.select("#homeBarChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map(function(d) { return d.acronym; }));
      y.domain([0, d3.max(data, function(d) { return d.amount; })]);

      svg.call(tip);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.4em")
        .attr("dy", ".65em")
        .attr("transform", "rotate(0)" );

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

      svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", function(d,i){return color(d['amount']);})
        .attr("x", function(d) { return x(d.acronym); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return height - y(d.amount); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    };

    $document.ready(function() {
      Agencies.get(function(data) {
        $scope.data = data['_embedded']['contextBasedSpendingList'];
        $scope.drawBarTrend();
      });
    });
  }]);
}();
