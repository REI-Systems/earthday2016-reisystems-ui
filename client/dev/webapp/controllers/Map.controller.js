!function() {
  'use strict';

  var myApp = angular.module('app');
  myApp.controller('MapCtrl', ['$scope', '$document', 'd3Service', 'StateData',
    function($scope, $document, d3Service, StateData) {
      $scope.drawMap = function() {
        var width = 960,
          height = 500,
          active = d3.select(null);

        var colorScale = d3Service.colorScale($scope.min, $scope.max);

        var projection = d3.geo.albersUsa()
          .scale(1000)
          .translate([width / 2, height / 2]);

        var path = d3.geo.path()
          .projection(projection);

        var svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height);

        svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height)
          .on("click", reset);

        var g = svg.append("g")
          .style("stroke-width", "1.5px");


        d3.json("assets/data/us.json", function(error, us) {
          d3.tsv("assets/data/us-county-names.tsv", function(tsv) {
            var names = {};
            tsv.forEach(function(d,i){
              names[d.id] = d.code;
            });

            var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Amount Sustainable:</strong> " + $scope.data[names[d['id']]] + "%";
              });

            svg.call(tip);

            g.selectAll("path")
              .data(topojson.feature(us, us.objects.states).features)
              .enter().append("path")
              .attr("d", path)
              .attr("class", "feature")
              .attr("fill", function(data) {
                var d = $scope.data[names[data['id']]] || Math.floor(Math.random()*1000);
                return colorScale(d);
              })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
              .on("click", clicked);

            g.append("path")
              .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
              .attr("class", "mesh")
              .attr("d", path);
          });
        });

        function clicked(d) {
          if (active.node() === this) return reset();
          active.classed("active", false);
          active = d3.select(this).classed("active", true);

          var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

          g.transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        }

        function reset() {
          active.classed("active", false);
          active = d3.select(null);

          g.transition()
            .duration(750)
            .style("stroke-width", "1.5px")
            .attr("transform", "");
        }
      };

      $scope.drawLegend = function() {
        //  TODO
      };

      $document.ready(function() {
        StateData.get(function(data) {
          var d = {};

          angular.forEach(data['_embedded']['contextBasedSpendingList'], function(c) {
            d[c['acronym']] = d3.format('.2f')((c['amountSustainable'] / c['amount']) * 100);
          });
          $scope.data = d;
          $scope.min = 0;
          $scope.max = d3.max(d3.values(d));
          $scope.drawMap();
          $scope.drawLegend();
        });
      });
    }
  ]);
}();
