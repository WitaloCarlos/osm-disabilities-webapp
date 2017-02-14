(function () {
    'use strict';

    angular.module('mapServ', [])
        .factory('mapService', MapService);

    MapService.$inject = (['$http']);

    function MapService($http) {
        var server_url = 'http://localhost:9200';
        return {
            getByTag: function (tag, value, apiPath,successCallback, errorCallback) {
                console.log('req: '+ server_url + '/api/'+ apiPath +'/' + tag + '/' + value);
                return $http.get(server_url + '/api/'+ apiPath +'/' + tag + '/' + value)
                    .then(successCallback)
                    .catch(errorCallback);
            },

             getCountByTag: function (tag, value, apiPath,successCallback, errorCallback) {
                
                return $http.get(server_url + '/api/'+ apiPath +'/' + tag + '/' + value)
                    .then(successCallback)
                    .catch(errorCallback);
            },

            getByCompositeTag: function (tag, value, apiPath,successCallback, errorCallback) {
                
                return $http.get(server_url + '/api/'+ apiPath +'/' + tag + '/' + value + '/' + compositeTag + '/' + compositeValue)
                    .then(successCallback)
                    .catch(errorCallback);
            },
            
        }

    }
})();