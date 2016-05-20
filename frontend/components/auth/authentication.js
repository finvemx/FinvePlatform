var app = angular.module("TodoApp.Auth", []),
;

app.service("TokenService", [function () {
    var userToken = "token";

    this.setToken = function (token) {
        localStorage[userToken] = token;
    }
    this.getToken = function () {
        return localStorage[userToken];
    }

    this.removeToken = function () {
        localStorage.removeItem(userToken);
    };

}]);

app.service("UserService", ["$http", "$q", "$location", "TokenService", function ($http, $q, $location, TokenService) {
    this.signup = function (user) {
        return $http.post("http://localhost:8080/auth/login", user);
    };

    this.login = function (user) {
        return $http.post("http://localhost:8080/auth/login", user).then(function (response) {
            TokenService.setToken.(response.data.token);
            return response;
        })
    };
    this.logout = function () {
        TokenService.removeToken()
        $location.path("/");
    };
    this.isAuthenticated = function () {
        return !!TokenService.getToken();
    }

}]);