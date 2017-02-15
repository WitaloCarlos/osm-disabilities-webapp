(function () {
    'use strict';

    angular.module('tagServ', [])
        .factory('tagService', TagService);

    TagService.$inject = (['$http']);

    function TagService($http) {
        
        return {
            getTags: function (successCallback, errorCallback) {
                
                return $http.get('../src/assets/json/tags.json')
                    .then(successCallback)
                    .catch(errorCallback);
            }
        }

    }
})();
