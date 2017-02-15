(function () {
    'use strict';

    angular
        .module('tagCtrl', [])
        .controller('tagController', TagController)
        .directive('tagCard', function(){return tagCard})
        .filter('checkValue', function(){return checkValue});

    TagController.$inject = ['$scope', '$http', '$stateParams', 'tagService', 'mapService'];


    function TagController($scope, $http, $stateParams, tagService, mapService) {

        var self = $scope;
        self.tags = [];
        self.apiPath = $stateParams.api;

        tagService.getTags(function (response) {
            self.tags = response.data;
        }, function (error) {
            console.log(error);
        })

        self.annotationsCount = function (key, value,tag) {

            if (!tag.annotations_count){
                mapService.getCountByTag(key, value, function(response){
                var result = response.data;
                tag.annotations_count = result.count;
                return tag.annotations_count;
            }, function(error){
                console.log(error);
                return null;
            })
            } else {
                 return tag.annotations_count;
            }



        }

    }

    function checkValue(value){
        if (!value){
            return 'N/D'
        } else {
            return value;
        }
    }

    function tagCard(){
      var directive = {

          scope: {
              tag: '='
          }

      }

      return directive;

    }


})();
