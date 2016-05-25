var app = angular.module("Finve", ["ngRoute", "Finve.Auth" ]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        });
});

app.constant("baseUrl", "http://localhost:5000/api");
app.constant("authUrl", "http://localhost:5000/auth");