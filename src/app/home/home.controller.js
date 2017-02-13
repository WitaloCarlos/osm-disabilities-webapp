(function () {
    'use strict';

    angular
        .module('homeMapCtrl', [])
        .controller('homeMapController', HomeMap);

    HomeMap.$inject = ['$scope', '$http', 'homeMapService'];

    function HomeMap($scope, $http, homeMapService) {

        var self = $scope;

        

        self.raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        self.getTag = function (tag, value) {
            console.log('getTag');
            homeMapService.getByTag(tag, value, function (response) {
                console.log("Success " + tag);

                self.annotations = response.data;

                self.coordinates = [];

                for (var i = 0; i < self.annotations.length; i++) {
                    var annotation = self.annotations[i];
                    var coor = [annotation['geom']['coordinates'][0], annotation['geom']['coordinates'][1]];

                    self.coordinates[i] = new ol.Feature(new ol.geom.Point(coor));

                    annotation = null;
                    coor = null;
                    
                }


                self.source = new ol.source.Vector({
                    features: self.coordinates
                });

                self.clusterSource = new ol.source.Cluster({
                    distance: 30,
                    source: self.source
                });

                self.styleCache = {};

                self.clusters = new ol.layer.Vector({
                    source: self.clusterSource,
                    style: function (feature, resolution) {

                        var size = feature.get('features').length;
                        var style = self.styleCache[size];

                        if (!style) {
                            style = new ol.style.Style({
                                image: new ol.style.Circle({
                                    radius: 10,
                                    stroke: new ol.style.Stroke({
                                        color: '#ff3b43'
                                    }),
                                    fill: new ol.style.Fill({
                                        color: '#ff3b43'
                                    })
                                }),
                                text: new ol.style.Text({
                                    text: size.toString(),
                                    fill: new ol.style.Fill({
                                        color: '#fff'
                                    })
                                })
                            });
                            self.styleCache[size] = style;

                        } // if(!style)

                        return style;
                    } // stylingFeature
                });

                self.raster = new ol.layer.Tile({
                    source: new ol.source.OSM()
                });

                self.map = new ol.Map({
                    layers: [self.raster, self.clusters],
                    target: 'map',
                    view: new ol.View({
                        projection: 'EPSG:4326',
                        center: [-0.118092, 51.509865],
                        zoom: 8
                    })
                });

                self.stylingFeature = 0;




            }, function (error) {
                console.log("Error " + error);
            });
        }

        self.getApiVersion = function (tag, value) {
            console.log('getTag');
            homeMapService.getApi(function (response) {
                console.log("Success " + response);
            }, function (error) {
                console.log("Error " + error);
            });
        }




    }

})();