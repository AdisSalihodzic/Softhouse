var softhouseWebApp = angular.module("SofthouseWebApp",["ngRoute","ngSanitize","pascalprecht.translate"]);

softhouseWebApp.config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true).hashPrefix('!');

});