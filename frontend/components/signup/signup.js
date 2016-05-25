var app = angular.module("Finve");

app.config(function ($routeProvider) {  
    $routeProvider
        .when("/signup", {
            templateUrl: "components/signup/signup.html",
            controller: "SignupController"
        })
});

app.controller("SignupController", ["$scope", "$http", "$location", "UserService", function ($scope, $http, $location, UserService) {  
    $scope.passwordMessage = "";

    $scope.signup = function (user) {
        if ($scope.user.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords do not match.";
        } else {
            UserService.signup(user).then(function (response) {
                $location.path("/login");
            }, function (response) {
                alert("There was a problem: " + response.data);
            });
        }
    }
}]);