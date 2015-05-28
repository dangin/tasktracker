angular.module('TaskTracker').controller('taskController', function($scope, $http, $mdDialog) {

    var vm = $scope;
    vm.statuses = [];
    vm.developers = [{
        name: 'test'
    }];
    vm.projects = [];
    vm.getID = getID;
    vm.showNewTaskModal = showNewTaskModal;
    vm.addNewTask = addNewTask;
    vm.isLoading = true;

    var dataurl = 'js/app/data/';

    $http.get(dataurl + 'statuses.json').success(function(data) {
        vm.statuses = data;
    })
    $http.get(dataurl + 'developers.json').success(function(data) {
        vm.isLoading = false;
        vm.developers = data;
    })
    $http.get(dataurl + 'projects.json').success(function(data) {
        vm.projects = data;
    })

    function getID(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (id == arr[i].id) {
                return arr[i];
            }
        }
    }

    function showNewTaskModal(ev) {
        $mdDialog.show({
            templateUrl: 'views/newTaskDialog.html',
            targetEvent: ev,
        });
    }
    vm.tasks = [{
        id: 1,
        project: 1,
        name: 'test',
        description: 'a description of a task to do eventually',
        status: 1,
        developer: 1,
        times: [],
        created: new Date(),
        modified: new Date()
    }];

    function Task() {
        this.project = 1,
        this.name = 'new task',
        this.description = 'created with new task button',
        this.status = 1,
        this.developer = 1,
        this.times = [],
        this.created = new Date(),
        this.modified = new Date()
    }

    function addNewTask() {
        console.log(new Task());
        Materialize.toast('New Task Created!', 3000)
        vm.tasks.push(new Task());
    }
})
