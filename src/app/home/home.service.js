(function () {
    'use strict';

    angular.module('homeMapServ', [])
        .factory('homeMapService', MapService);

    MapService.$inject = (['$http']);

    function MapService($http) {
        var server_url = 'http://192.168.25.15:9200';
        return {
            getByTag: function (tag, value, successCallback, errorCallback) {
                console.log(server_url + '/api/nodes/' + tag + '/' + value);
                return $http.get(server_url + '/api/nodes/' + tag + '/' + value)
                    .then(successCallback)
                    .catch(errorCallback);
            },

            getApi: function (successCallback, errorCallback) {
                console.log(server_url + '/api');
                return $http.get(server_url + '/api/')
                    .then(successCallback)
                    .catch(errorCallback);
            }
        }

    }
})();