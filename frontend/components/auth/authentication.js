var app = angular.module("Finve.Auth", []);


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
            TokenService.setToken(response.data.token);
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

app.factory("AuthInterceptor", ["$q", "$location", "TokenService", function ($q, $location, TokenService) {
    return {
        request: function (config) {
            var token = TokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = "Bearer " + token
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path("/login");
            }
            return $q.reject(response);
        }
    }
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});