(function() {
    'use strict';

    angular.module('app').factory('dataService', dataService);
    
    function dataService($http, $log) {
        return {
            getColumnNames: getColumnNames,
            getScatterDatapoints: getScatterDatapoints
        };

        function getColumnNames() {
            return $http({method: 'GET', url: '/get_table'})
                .then(function (resp) {
                    $log.debug(resp.data);
                    return resp.data.columns;
                })
                .catch(function (err) {
                    $log.error(err);
                    return Promise.reject(err);
                })
        }
        
        function getScatterDatapoints(col1, col2) {
            return $http({method: 'GET', url: '/get_attributes', params: {x: col1, y: col2}})
                .then(function (resp) {
                    $log.debug(resp.data);
                    return resp.data;
                }).catch(function (err) {
                    $log.error(err);
                    return Promise.reject(err);
                })
        }
    }
}());