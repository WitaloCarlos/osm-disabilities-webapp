(function () {
    'use strict';

    angular
        .module('homeMapCtrl', [])
        .controller('homeMapController', HomeMap);

    HomeMap.$inject = ['$scope', '$http', 'homeMapService'];

    function HomeMap($scope, $http, homeMapService) {

        var self = $scope;

        self.getTag = function (tag, value) {
            console.log('getTag');
            homeMapService.getByTag(tag, value, function (response) {
                console.log("Success "+response);
            }, function (error) {
                console.log("Error "+error);
            });
        }

        self.getApiVersion = function (tag, value) {
            console.log('getTag');
            homeMapService.getApi(function (response) {
                console.log("Success "+response);
            }, function (error) {
                console.log("Error "+error);
            });
        }




    }

})();