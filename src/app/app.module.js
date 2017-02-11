(function () {
    'use strict';

    angular.module('app',
        ['ui.router',
            'app.home',
            'homeMapCtrl',
            'homeMapServ'])
        .config(['$stateProvider', '$urlRouterProvider', stateConfig]);

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            });

        $urlRouterProvider.when('', '/home');
        $urlRouterProvider.otherwise('/home');

    }
})();