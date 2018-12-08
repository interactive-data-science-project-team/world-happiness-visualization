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

        dataService.getLinearRegressions(["Log_GDP_per_capita", "Social_support"])
            .then(function (resp) {
                $log.debug(resp);
                ctrl.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                ctrl.series = ['Series A', 'Series B'];

                ctrl.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
            });
    }
}());