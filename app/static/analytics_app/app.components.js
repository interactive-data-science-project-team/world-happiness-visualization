(function() {
    'use strict';

    angular.module('app').component('scatterPlot', {
        templateUrl: 'scatter_plot.html',
        controller: scatterPlotCtrl
    }).component('regression', {
        templateUrl: 'regression.html',
        controller: regressionCtrl
    });

    function scatterPlotCtrl($scope, $log, dataService) {
        var ctrl = this;

        ctrl.$onInit = function () {
          dataService.getColumnNames()
              .then(function (colNames) {
                  ctrl.colNames = colNames;
              })
        };

        ctrl.getScatterDatapoints = function() {
            dataService.getScatterDatapoints($scope.scatterPlot.colX, $scope.scatterPlot.colY)
                .then(function (datapoints) {
                    $log.debug('form submitted');
                    ctrl.data = datapoints.chart;
                    ctrl.myChartObject.data = datapoints.googlechart;
                })
        };

        ctrl.options = {};
        ctrl.series = ['X', 'Y'];
    }

    function regressionCtrl($log, dataService) {
        var ctrl = this;

        ctrl.regCols = [];

        ctrl.$onInit = function () {
          dataService.getColumnNames()
              .then(function (colNames) {
                  ctrl.colNames = colNames;
              })
        };

        ctrl.addColumn = function(col) {
            if (!ctrl.regCols.includes(col)) {
                ctrl.regCols.push(col)
            }
        }
    }
}());