angular.module('TaskTracker').controller('mainController', mainController)

function mainController($scope, $translate) {

    var vm = $scope;
    vm.changeLanguage = changeLanguage;
    vm.appName = 'TaskTracker';
    vm.menuItems = [{link:'', name:'home'},{link:'tasks', name:'tasks'},{link:'settings', name:'settings'}];
    vm.languages = [{locale:'en', name:'English'},{locale:'fr', name:'French'}];
    vm.currentLanguage = 'en';


    function changeLanguage() {
        $translate.use(vm.currentLanguage);
    }
}
