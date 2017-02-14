(function () {
    'use strict';

    angular
        .module('mapCtrl', [])
        .controller('mapController', MapController);

    MapController.$inject = ['$scope', '$http', '$stateParams', 'mapService'];

    function MapController($scope, $http, $stateParams, mapService) {

        var self = $scope;

        self.raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        self.boundarySrc = new ol.source.Vector({
            url: '/src/assets/json/londres.geojson',
            format: new ol.format.GeoJSON()

        });

        self.boundaryStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#6e0000',
                width: 3
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#319FD3',
                    width: 1
                })
            })
        });

        self.boundary = new ol.layer.Vector({
            source: self.boundarySrc,
            style: self.boundaryStyle
        });

        var tag = $stateParams.tag;
        var value = $stateParams.value;
        var apiPath = $stateParams.api;

        console.log('getTag');
        mapService.getByTag(tag, value, apiPath, function (response) {
            console.log("Success " + tag);

            self.annotations = response.data;

            self.coordinates = [];

            if (self.annotations) {
                for (var i = 0; i < self.annotations.length; i++) {
                    var annotation = self.annotations[i];
                    if (apiPath === 'nodes') {
                        var coor = [annotation['geom']['coordinates'][0], annotation['geom']['coordinates'][1]];
                        self.coordinates[i] = new ol.Feature(new ol.geom.Point(coor));
                    } else if (apiPath === 'ways') {
                        var wayNodes = annotation['way_nodes'];
                      
                        for (var j = 0; j < wayNodes.length; j++) {
                            var way = wayNodes[j];
                            var coor = [way['node']['geom']['coordinates'][0], way['node']['geom']['coordinates'][1]];
                            self.coordinates[i] = new ol.Feature(new ol.geom.Point(coor));
                        }
                    }



                    annotation = null;
                    coor = null;

                }
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

            self.clusters.setZIndex(99);

            self.raster = new ol.layer.Tile({
                source: new ol.source.OSM()
            });

            self.map = new ol.Map({
                layers: [self.raster, self.boundary, self.clusters],
                target: 'map',
                view: new ol.View({
                    projection: 'EPSG:4326',
                    center: [-0.118092, 51.509865],
                    zoom: 9
                })
            });

            self.stylingFeature = 0;




        }, function (error) {
            console.log("Error " + error);
        });

    }

})();