angular
    .module('TaskList')
    .factory('TaskService', TaskService);

TaskService.$inject = ['$resource'];

function TaskService($resource) {

    return $resource('http://localhost:8080/task-list/tasks/:id', { id: '@_id'}, {
        update: {
          method: 'PUT'
        }
    });

}
