var app = angular.module("Finve");

app.config(function ($routeProvider) {
    $routeProvider
        .when("/investment", {
            templateUrl: "components/investment/investmentList.html",
            controller: "InvestmentController"
        })
});

app.controller("InvestmentController", ["$scope", "$http", "baseUrl", function ($scope, $http, baseUrl) {
    $scope.todos = [];
    $http.get(baseUrl + "/investment").then(function (response) {
        $scope.todos = response.data;
    }, function (response) {
        console.log(response)
    });
}]);