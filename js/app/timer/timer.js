angular.module('dgTimer',[
        'ngMaterial', 'ngMdIcons'
]).directive('dgTimer', function() {
    function timerController($timeout, $scope, $mdDialog) {
        var vm = this;

        var PLAYICONSTYLE = { fill: 'rgb(0,188,212)', position:'absolute', top:'8px', left:'8px' };
        var STOPICONSTYLE = { fill: 'red', position:'absolute', top:'8px', left:'8px' };
        var EDITICONSTYLE = { fill: 'rgb(0,188,212)', position:'absolute', top:'8px', left:'8px' };
        vm.timers = $scope.timers;
        vm.showStart = true;
        vm.showEdit = false;
        vm.currentTimer = new Timer();
        vm.getTotalTime = getTotalTime;
        vm.toggleTimer = toggleTimer;
        vm.startTimer = startTimer;
        vm.stopTimer = stopTimer;
        vm.editTimers = editTimers;
        vm.iconStyle = function() { return vm.showStart ? PLAYICONSTYLE : STOPICONSTYLE; }
        vm.icon = function() { return vm.showStart ? 'play_arrow' : 'stop'; }
        vm.editIconStyle = EDITICONSTYLE;

        function editTimers($event) {
            $mdDialog.show({
                targetEvent: $event,
                parent: angular.element('.container'),
                templateUrl: 'js/app/timer/editTimers.html',
                locals: {
                    timers: angular.copy(vm.timers)
                },
                controller: function($scope, $mdDialog, timers) {
                    $scope.timers = timers;
                    $scope.close = function() {
                        $mdDialog.hide('close')
                    }
                    $scope.cancel = function() {
                        $mdDialog.cancel('canceled')
                    }

                }
            }).then(function(response) {
                console.log(response);
            })
        }
        function toggleTimer() {
            if (vm.showStart) {
                vm.startTimer();
            } else {
                vm.stopTimer();
            }
        }
        function startTimer() {
            vm.currentTimer.startTimer();
            vm.showStart = false;
        }

        function stopTimer() {
            vm.currentTimer.endTimer();
            vm.timers.push(vm.currentTimer);
            vm.currentTimer = new Timer();
            vm.showStart = true;
        }

        function getTotalTime() {
            var time = 0;
            if (vm.timers) {
                vm.timers.forEach(function(elem, idx, arr) {
                    time += elem.getTime();
                })
            }
            time += vm.currentTimer.getTime();
            return time;
        }



        // Timer
        function Timer() {
            var timer = this;
            this.start;
            this.end;
            this.startTimer = startTimer;
            this.endTimer = endTimer;
            this.getTime = getTime;
            this.updateTime = updateTime;

            function getTime() {
                if (!this.start) {
                    return 0;
                }
                if (this.end) {
                    return this.end.getTime() - this.start.getTime();
                } else {
                    return new Date().getTime() - this.start.getTime();
                }
            }

            function updateTime() {
                timer.getTime();
                $timeout(timer.updateTime, 100);
            }

            function startTimer() {
                this.start = new Date();
                this.updateTime();
            }

            function endTimer() {
                this.end = new Date();
            }
        }
    }

    return {
        restrict: 'E',
        templateUrl: 'js/app/timer/timer.html',
        controller: timerController,
        controllerAs: 'vm',
        scope: {
            timers: '=timers'
        }
    }
}).filter('dgTime', function() {
    return function formatTime(t) {
        var sec = parseInt(t/1000) % 60;
        var min = parseInt(t/1000/60) % 60;
        var hrs = parseInt(t/1000/60/24);
        var time = '';
        if (hrs)
            time += hrs + 'h ';
        if (min||hrs)
            time += min + 'm ';
        time += sec + 's ';
        return time;
    }
})
