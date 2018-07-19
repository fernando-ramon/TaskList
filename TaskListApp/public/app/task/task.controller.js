(function () {
    'use strict';

    angular
        .module('TaskList')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['TaskService'];

    function TaskController(TaskService) {
        var vm = this;
        vm.taskList = [];
        vm.task = new TaskService();

        vm.saveTask = saveTask;
        vm.editTask = editTask;
        vm.doneTask = doneTask;
        vm.unDoneTask = unDoneTask;
        vm.deleteTask = deleteTask;

        function saveTask() {
            if (vm.task.id) {
                updateTask(vm.task);
            } else {
                createTask(vm.task);
            }
        }

        function editTask(taskParam) {
            vm.task.id = taskParam.id;
            vm.task.titulo = taskParam.titulo;
            vm.task.descricao = taskParam.descricao;
            vm.task.concluido = taskParam.concluido;
        }

        function createTask(taskParam) {
            if (taskParam.titulo) {
                taskParam.$save().then(function () {
                    vm.task = new TaskService();
                    fillTaskList();
                }).catch(function (erro) {
                    console.log(erro);
                });
            }
        }
        
        function updateTask(taskParam) {
            var params = { id: taskParam.id };
            taskParam.$update(params).then(function () {
                vm.task = new TaskService();
                fillTaskList();
            }).catch(function (erro) {
                console.log(erro);
            });
        }

        function doneTask(taskParam) {
            taskParam.concluido = true;
            updateTask(taskParam);
        }
        
        function unDoneTask(taskParam) {
            taskParam.concluido = false;
            updateTask(taskParam);
        }
        
        function deleteTask(taskParam) {
            var params = { id: taskParam.id };
            TaskService.delete(params, fillTaskList, errorTaskList);
        }

        function fillTaskList() {
            TaskService.query(successTaskList, errorTaskList);
        }
    
        function successTaskList(taskList) {
            vm.taskList = taskList;
        }
    
        function errorTaskList(erro) {
            console.log(erro);
        }

        function init() {
            fillTaskList();
        }

        init();
    }

})();