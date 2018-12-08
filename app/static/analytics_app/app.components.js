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

        dataService.getLinearRegressions(["Log_GDP_per_capita", "Social_support", "Perceptions_of_corruption", "Freedom_to_make_life_choices", "Generosity", "Negative_affect"])
            .then(function (resp) {
                $log.debug(resp);
                $log.debug(resp.keys);
                $log.debug(resp.values);

                ctrl.labels = resp.keys;
                ctrl.series = ["coefficient"];

                ctrl.data = [
                    resp.values
                ];
            });
    }
}());