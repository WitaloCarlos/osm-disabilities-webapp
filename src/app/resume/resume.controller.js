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

        google.charts.setOnLoadCallback(drawUsersCount);

        google.charts.setOnLoadCallback(drawTargetVAnnotationsCount);

        google.charts.setOnLoadCallback(drawGeneralVDisabilitiesCount);

         google.charts.setOnLoadCallback(drawWheelchair);

        



        var self = $scope;

        self.wheelchair_borough = null;

         resumeService.getWheelchairByBorough(function (response) {
                self.wheelchair_borough = response.data;
            },
                function (error) { console.log(error); })

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

        function drawUsersCount() {
            resumeService.getUsersCount(function (response) {
                var json = response.data;

                var data = new google.visualization.arrayToDataTable(mountUsersCountArray(json));
                var options = {
                    title: "Quantidade de Voluntários por Tags de Acessibilidade",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value'

                }

                var tree = new google.visualization.PieChart(document.getElementById('users_v_annotations'));

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
                    pieSliceText: 'value',
                    slices: {  2: {offset: 0.5}}

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
                    pieSliceText: 'value',
                    slices: {  0: {offset: 0.5}}

                }

                var tree = new google.visualization.PieChart(document.getElementById('general_v_disabilities_chart'));

                tree.draw(data, options);
            },
                function (error) { console.log(error); })
        }

        function drawWheelchair() {
            resumeService.getTagsCount(function (response) {
                var json = response.data;

                var data = new google.visualization.arrayToDataTable(mountWheelchairArray(json));
                var options = {
                    title: "Anotações de Acesso para Cadeirantes",
                    width: 650,
                    height: 300,
                    legend: { position: 'labeled' },
                    pieSliceText: 'value',
                    slices: {  3: {offset: 0.5}}

                }

                var tree = new google.visualization.PieChart(document.getElementById('wheelchair_chart'));

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

         function mountUsersCountArray(json) {

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

        function mountWheelchairArray(json) {

            var array = [];
            array[0] = ['Valor', 'Quantidade'];

            var yes = 0;
            var no = 0;
            var limited = 0;
            var designated = 0;
            var kerb_flush = 0;
            var kerb_lowered = 0;
            var desc = 0;

            for (var i = 0; i < json.length; i++) {
                if (json[i]['id'] === 'wheelchair_yes') {
                    yes += json[i]['count'];
                } else if (json[i]['id'] === 'wheelchair_no')  {
                    no += json[i]['count'];
                } else if (json[i]['id'] === 'wheelchair_limited')  {
                    limited += json[i]['count'];
                } else if (json[i]['id'] === 'wheelchair_designated')  {
                    designated += json[i]['count'];
                } else if (json[i]['id'] === 'kerb_flush')  {
                    kerb_flush += json[i]['count'];
                } else if (json[i]['id'] === 'kerb_lowered')  {
                    kerb_lowered += json[i]['count'];
                }  else if (json[i]['id'] === 'wheelchair_description')  {
                    desc += json[i]['count'];
                } else {
                    // ignore
                }
            }

            array[1] = ['Pleno', yes];
            array[2] = ['Não', no];
            array[3] = ['Limitado', limited];
            array[4] = ['Designado', designated];
            array[5] = ['Rampa baixa', kerb_lowered];
            array[6] = ['Rampa nivelada', kerb_flush];
            array[6] = ['Descrição específica', desc];



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
