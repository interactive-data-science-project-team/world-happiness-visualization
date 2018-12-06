(function () {
    'use strict';

    angular.module('app', [
        /* Angular modules */
        'ngAnimate',
        'ngMaterial',
        'ngMessages',
        'ui.router',

        /* charts */
        'chart.js',
        'googlechart'
    ]).config(function ($stateProvider, ChartJsProvider) {
        ChartJsProvider.setOptions({
            colors:
                ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        });
    })
}());