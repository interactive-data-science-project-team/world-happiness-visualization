(function() {
    'use strict';

    angular.module('app').factory('dataService', dataService);
    
    function dataService($http, $log) {
        return {
            getColumnNames: getColumnNames
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
    }
}());