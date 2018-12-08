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

        dataService.getLinearRegressions(["Log_GDP_per_capita", "Social_support"])
            .then(function (resp) {
                $log.debug(resp);
            });
        /*
        ctrl.data = [[{
            x: -2,
            y: -5
        }, {
            x: 0,
            y: 3
        }, {
            x: 1,
            y: 2
        },
            {
                x: 4,
                y: 5
            }]];
        */

        ctrl.options = {};
        ctrl.series = ['X', 'Y'];

        ctrl.myChartObject = {};

        ctrl.myChartObject.type = "ScatterChart";

        ctrl.myChartObject.data = {
            "cols": [
                {id: "x", label: "x", type: "number"},
                {id: "y", label: "y", type: "number"}
            ], "rows": [
                {
                    c: [
                        {v: "4"},
                        {v: 3},
                    ]
                },
                {
                    c: [
                        {v: "5"},
                        {v: 31}
                    ]
                },
                {
                    c: [
                        {v: "4"},
                        {v: 1},
                    ]
                },
                {
                    c: [
                        {v: "5"},
                        {v: 2},
                    ]
                }
            ]
        };

        ctrl.myChartObject.options = {
            'title': 'How Much Pizza I Ate Last Night'
        };
    }

    function regressionCtrl($log) {

    }
}());