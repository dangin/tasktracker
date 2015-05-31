angular.module('TaskTracker').controller('taskController', function($scope, $http, $mdDialog) {

    var vm = $scope;
    vm.statuses = [];
    vm.developers = [];
    vm.projects = [];
    vm.getID = getID;
    vm.newTask = newTask;
    vm.editTask = editTask;
    vm.addNewTask = addNewTask;
    vm.changeStatus = changeStatus;
    vm.deleteTask = deleteTask;
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

    function newTask($event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            templateUrl: 'views/newTaskDialog.html',
            targetEvent: $event,
            parent: angular.element('.container'),
            controller: function($scope, $mdDialog, lists) {
                $scope.lists = lists;
                var defaultValues = {
                    project: 1,
                    status: 1,
                    developer: 1
                }
                $scope.newtask = {
                    project: defaultValues.project,
                    status: defaultValues.status,
                    developer: defaultValues.developer,
                    name:'',
                    description:'',
                    times:[]
                }
                $scope.save = function() {
                    $mdDialog.hide($scope.newtask);
                }
                $scope.cancel = function() {
                    $mdDialog.cancel('canceled');
                }
            },
            locals: {
                lists : {
                    projects : vm.projects,
                    developers: vm.developers,
                    statuses:vm.statuses
                }
            }
        }).then(function(response) {
            vm.tasks.push(response);
        })
    }


    function editTask($event, task) {
        $mdDialog.show({
            clickOutsideToClose: true,
            templateUrl: 'views/newTaskDialog.html',
            targetEvent: $event,
            parent: angular.element('.container'),
            controller: function($scope, $mdDialog, lists) {
                $scope.lists = lists;

                $scope.newtask = angular.copy(task)
                $scope.save = function() {
                    $mdDialog.hide($scope.newtask);
                }
                $scope.cancel = function() {
                    $mdDialog.cancel('canceled');
                }
            },
            locals: {
                lists : {
                    projects : vm.projects,
                    developers: vm.developers,
                    statuses:vm.statuses
                }
            }
        }).then(function(response) {
            var idx = vm.tasks.map(function(x) {return x.id; }).indexOf(response.id);
            vm.tasks[idx] = response;
        })
    }

    function deleteTask(task) {
        var confirm = $mdDialog.confirm().title('Confirm').content('are you sure?').ok('yes').cancel('no')
        $mdDialog.show(confirm).then(function(response) {
           var idx = vm.tasks.indexOf(task);
            vm.tasks.splice(idx,1);
        })
    }
    function changeStatus(task, status) {
        console.log(task, status);
        task.status = status.id;
    }



    vm.tasks = [{"id":1,"project":1,"name":"test asd ss ads sds ss a as s asda sda asad as","description":"What about a long task name with a long description a s sa dasd asd asdasd asds s ss s s ad sa sadas sa s","status":1,"developer":1,"times":[],"created":"2015-05-31T21:39:23.242Z","modified":"2015-05-31T21:39:23.242Z","$$hashKey":"object:25"},{"project":"1","status":"2","developer":"1","name":"Completed task","description":"Description that goes along with it","times":[],"$$hashKey":"object:97"},{"project":"1","status":"3","developer":"1","name":"Pending task","description":"And some other description for a pending task","times":[],"$$hashKey":"object:157"},{"project":"1","status":"4","developer":"1","name":"Canceled task","description":"This task is canceled","times":[],"$$hashKey":"object:266"}];

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
