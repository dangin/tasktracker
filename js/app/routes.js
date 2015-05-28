angular.module('TaskTracker').config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/tasks', {
            templateUrl: 'views/tasks.html',
            controller: 'taskController'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'settingsController'
        })
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        })

}])
