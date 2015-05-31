angular.module('TaskTracker', [
    'ngRoute',
    'ngMaterial',
    'pascalprecht.translate',
    'dgTimer',
    'ngMdIcons',
    'textAngular',
    'truncate',
    'tasktracker.filters',
    'ng-context-menu'
])
.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('red')
        .warnPalette('yellow')
        .backgroundPalette('grey');
}).config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'js/app/languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
});






