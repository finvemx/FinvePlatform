var app = angular.module("TodoApp");

app.config(function ($routeProvider) {
    $routeProvider
        .when("/todo", {
            templateUrl: "components/todo/todo-list.html",
            controller: "TodoController"
        })
});

app.controller("TodoController", ["$scope", "$http", "baseUrl", function ($scope, $http, baseUrl) {
    $scope.todos = [];
    $http.get(baseUrl + "/todo").then(function (response) {
        $scope.todos = response.data;
    }, function (response) {
        console.log(response)
    });
}]);