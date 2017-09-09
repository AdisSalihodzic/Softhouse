var softhouseWebApp = angular.module("SofthouseWebApp",["ngRoute","pascalprecht.translate","angularMoment"]);

softhouseWebApp.config(["$routeProvider","$translateProvider",function($routeProvider,$translateProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'LoginCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            resolve: {
                logincheck: checkLoggedin
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
    $translateProvider.preferredLanguage(navigator.language);
    $translateProvider.registerAvailableLanguageKeys(['en','tr','bs'],{
        "en-*":'en',
        "tr-*":'tr',
        "bs-*":"bs"
    });
    $translateProvider.useStaticFilesLoader({
        prefix:"data/",
        suffix:".json"
    });
    $translateProvider.useSanitizeValueStrategy(null);
    //$locationProvider.html5Mode(true).hashPrefix('!');

}]);


var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        //User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else { //User is not Authenticated
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    return deferred.promise;
};