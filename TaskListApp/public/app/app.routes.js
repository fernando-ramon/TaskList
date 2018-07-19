angular
    .module('TaskList')
    .config(AppRoutreConfig);

AppRoutreConfig.$inject = ['$routeProvider'];
      
function AppRoutreConfig($routeProvider){
    $routeProvider.when('/task', {
        templateUrl: 'app/task/task.html', 
        controller: 'TaskController'
    });

    $routeProvider.when('/task/:id', {
        templateUrl: 'app/task/task.html', 
        controller: 'TaskController'
    });

    $routeProvider.otherwise({redirectTo: '/task'});
};
