var app = angular.module("Finve");

app.config(function ($routeProvider) {  
    $routeProvider
        .when("/login", {
            templateUrl: "components/login/login.html",
            controller: "LoginController"
        })
});

app.controller("LoginController", ["$scope", "$http", "$location", "UserService", function ($scope, $http, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/");
        }, function (response) {
            alert(response.data.message);
            console.log(response.data.message)
        });
    }
}]);