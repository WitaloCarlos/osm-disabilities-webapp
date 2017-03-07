(function () {
    'use strict';

    angular
        .module('resumeCtrl', [])
        .controller('resumeController', ResumeController);

    ResumeController.$inject = ['$scope', '$http', '$stateParams', 'resumeService'];

    function ResumeController($scope, $http, $stateParams, resumeService) {

        google.charts.load('current', { 'packages': ['corechart', 'bar'] });

        google.charts.setOnLoadCallback(drawTargets);

        google.charts.setOnLoadCallback(drawTagCount);

        google.charts.setOnLoadCallback(drawTargetVAnnotationsCount);

        google.charts.setOnLoadCallback(drawGeneralVDisabilitiesCount);

        



        var self = $scope;

        function drawTargets() {
            resumeService.getTargets(function (response) {
                var json = response.data;
                var data = new google.visualization.DataTable(json);
                var options = {
                    title: "Público Alvo das Tags de Acessibilidade",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value'

                }

                var chart = new google.visualization.PieChart(document.getElementById('targets_chart'));
                chart.draw(data, options);
            }, function (error) {
                console.log(error);
            })
        }

        function drawTagCount() {
            resumeService.getTagsCount(function (response) {
                var json = response.data;

                var data = new google.visualization.arrayToDataTable(mountTagsCountTreeArray(json));
                var options = {
                    title: "Anotações de Tags de Acessibilidade",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value'

                }

                var tree = new google.visualization.PieChart(document.getElementById('tags_count_chart'));

                tree.draw(data, options);
            },
                function (error) { console.log(error); })
        }


        function drawTargetVAnnotationsCount() {
            resumeService.getTags(function (response) {
                var json = response.data;

                var data = new google.visualization.arrayToDataTable(mountAnnotationsTargetArray(json));
                var options = {
                    title: "Anotações por público alvo",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value'

                }

                var tree = new google.visualization.PieChart(document.getElementById('tags_v_annotations_chart'));

                tree.draw(data, options);
            },
                function (error) { console.log(error); })
        }

        function drawGeneralVDisabilitiesCount() {
            resumeService.getTagsCount(function (response) {
                var json = response.data;

                var data = new google.visualization.arrayToDataTable(mountGeneralVDisabilitiesArray(json));
                var options = {
                    title: "Anotações Gerais x Anotações de Acessibilidade",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value'

                }

                var tree = new google.visualization.PieChart(document.getElementById('general_v_disabilities_chart'));

                tree.draw(data, options);
            },
                function (error) { console.log(error); })
        }


        function mountTagsCountTreeArray(json) {

            var array = [];
            array[0] = ['Tag', 'Quantidade'];

            for (var i = 0; i < json.length; i++) {
                if (json[i]['id'] === 'all_tags') {
                    // ignore
                } else {
                    array[i] = [json[i]['id'], json[i]['count']];
                }
            }


            return array;
        }

        function mountGeneralVDisabilitiesArray(json) {

            var array = [];
            array[0] = ['Categoria', 'Quantidade'];

            var general = 0;
            var disabilities = 0;

            for (var i = 0; i < json.length; i++) {
                if (json[i]['id'] === 'all_tags') {
                    general += json[i]['count'];
                } else {
                    disabilities += json[i]['count'];
                }
            }

            array[1] = ['Geral', general];
            array[2] = ['Acessibilidade', disabilities];


            return array;
        }



        function mountAnnotationsTargetArray(json) {

            var array = [];
            var targets = {};
            var jsonKeys = 0;

            array[0] = ['Publico Alvo', 'Anotações'];


            for (var i = 0; i < json.length; i++) {
                if (!targets.hasOwnProperty(json[i]['target'])) {
                    targets[json[i]['target']] = json[i]['annotations_count'];
                } else {
                    targets[json[i]['target']] += json[i]['annotations_count'];
                }
            }

            for (var key in targets)
                if (targets.hasOwnProperty(key))
                    jsonKeys++;

            for (var j = 0; j < jsonKeys; j++) {
                array[j + 1] = [Object.keys(targets)[j], Object.values(targets)[j]];
            }


            return array;
        }


    }


})();
