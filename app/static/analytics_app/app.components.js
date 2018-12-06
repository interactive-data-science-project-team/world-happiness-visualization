(function() {
    'use strict';

    angular.module('app').component('scatterPlot', {
        templateUrl: 'scatter_plot.html',
        controller: scatterPlotCtrl
    });

    function scatterPlotCtrl(dataService) {
        var ctrl = this;

        this.$onInit = function () {
          dataService.getColumnNames()
              .then(function (colNames) {
                  ctrl.colNames = colNames;
              })
        };

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

        ctrl.options = {};

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
}());