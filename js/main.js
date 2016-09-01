var bastionApp = angular.module('bastionApp', ['ngRoute', 'ngAnimate', 'providers', 'services', 'controllers', 'ui.bootstrap']);

bastionApp.config(['$routeProvider', 'urlFactoryProvider',
    function($routeProvider, urlFactoryProvider) {
        $routeProvider.when(urlFactoryProvider.getHomeUrl(), {
            templateUrl: 'templates/home.html',
            controller: 'homeController',
            controllerAs: 'homeModel'
        }).when(urlFactoryProvider.getWerkingUrl(), {
            templateUrl: 'templates/werking.html',
            controller: 'werkingController',
            controllerAs: 'werkingModel'
        }).when(urlFactoryProvider.getLidWordenUrl(), {
            templateUrl: 'templates/lidWorden.html',
            controller: 'lidWordenController',
            controllerAs: 'lidWordenModel'
        }).when(urlFactoryProvider.getActiviteitenUrl(), {
            templateUrl: 'templates/activiteiten.html',
            controller: 'activiteitenController',
            controllerAs: 'activiteitenModel'
        }).when(urlFactoryProvider.getFotosUrl(), {
            templateUrl: 'templates/fotos.html',
            controller: 'fotosController',
            controllerAs: 'fotosModel'
        }).when(urlFactoryProvider.getEventFotosUrl(), {
            templateUrl: 'templates/eventFotos.html',
            controller: 'eventFotosController',
            controllerAs: 'eventFotosModel'
        }).when(urlFactoryProvider.getEventFotoUrl(), {
            templateUrl: 'templates/eventFoto.html',
            controller: 'eventFotoController',
            controllerAs: 'eventFotoModel'
        }).when(urlFactoryProvider.getGastenboekUrl(), {
            templateUrl: 'templates/gastenboek.html',
            controller: 'gastenboekController',
            controllerAs: 'gastenboekModel'
        }).when(urlFactoryProvider.getContactUrl(), {
            templateUrl: 'templates/contact.html',
            controller: 'contactController',
            controllerAs: 'contactModel'
        }).otherwise({
            templateUrl: 'templates/home.html',
            controller: 'homeController',
            controllerAs: 'homeModel'
        });
    }
]);
