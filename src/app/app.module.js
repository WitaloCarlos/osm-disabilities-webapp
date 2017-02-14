(function () {
    'use strict';

    angular.module('app',
        ['ui.router',
            'app.map',
            'app.tag',
            'mapCtrl',
            'tagCtrl',
            'mapServ',
            'tagServ'])
        .config(['$stateProvider', '$urlRouterProvider', stateConfig]);

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            })
            .state('tag', {
                url: '/tags/{api}',
                templateUrl: 'app/tag/tag.html'
            })
            .state('map', {
                url: '/map/{api}/{tag}/{value}',
                templateUrl: 'app/map/map.html'
            });

        $urlRouterProvider.when('', '/home');
        $urlRouterProvider.otherwise('/home');

    }
})();