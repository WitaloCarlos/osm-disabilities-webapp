(function () {
    'use strict';

    angular.module('resumeServ', [])
        .factory('resumeService', ResumeService);

    ResumeService.$inject = (['$http']);

    function ResumeService($http) {
      
        return {
            getTargets: function (successCallback, errorCallback) {

                return $http.get('../src/assets/json/targets.json')
                    .then(successCallback)
                    .catch(errorCallback);
            },

            getTagsCount: function (successCallback, errorCallback) {

                return $http.get('../src/assets/json/tags_count.json')
                    .then(successCallback)
                    .catch(errorCallback);
            },

             getUsersCount: function (successCallback, errorCallback) {

                return $http.get('../src/assets/json/user_tags_count.json')
                    .then(successCallback)
                    .catch(errorCallback);
            },

            getWheelchairByBorough: function (successCallback, errorCallback) {

                return $http.get('../src/assets/json/wheelchair.json')
                    .then(successCallback)
                    .catch(errorCallback);
            },

            getTags: function (successCallback, errorCallback) {

                return $http.get('../src/assets/json/tags.json')
                    .then(successCallback)
                    .catch(errorCallback);
            }
        }

    }
})();
