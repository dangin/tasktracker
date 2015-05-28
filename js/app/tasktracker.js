angular.module('TaskTracker', ['ngRoute', 'ngMaterial', 'pascalprecht.translate']).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
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






