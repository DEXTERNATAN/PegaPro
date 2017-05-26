angular.module('pegapro')

.service('AuthService', function($q, $http, $rootScope, USER_ROLES, SERVERS) {
    
    var LOCAL_TOKEN_KEY = 'pegaproTokenKey';
    var username = '';
    var usuario = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        username = token.split('.')[0];
        isAuthenticated = true;
        authToken = token;

        if (username == 'admin') {
            role = USER_ROLES.admin
        }
        if (username == 'user') {
            role = USER_ROLES.public
        }

        // Set the token as header for your requests!
        $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        usuario = '';
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem("CurrentUser");
    }

    var login = function(name, pw) {
        return $q(function(resolve, reject) {

            var dadosDoLogin = {
                params: {
                    email: name,
                    password: pw
                }
            };

            var User = $http.get(SERVERS.prod + 'user/login?api_key=291984', dadosDoLogin).then(successCallback, errorCallback);

            function successCallback(response) {
                console.log('response', response.data.user.email);
                if (name == response.data.user.email && pw == response.data.user.password) {
                    storeUserCredentials(name + response.data.token);
                    resolve(response.data);
                } else {
                    reject('Login Failed.');
                }
            }

            function errorCallback(error) {
                reject(error);
                return error;
            }

        });
    };

    var loginFacebook = function(name, pw) {
        return $q(function(resolve, reject) {

            storeUserCredentials(name + '.' + pw);
            resolve('login com sucesso');
        });
    };

    var loginGoogle = function(name, pw) {
        return $q(function(resolve, reject) {

            storeUserCredentials(name + '.' + pw);
            resolve('login com sucesso');
        });
    };

    var logout = function() {
        destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
        login: login,
        loginFacebook: loginFacebook,
        loginGoogle: loginGoogle,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {
            return isAuthenticated;
        },
        username: function() {
            return username;
        },
        usuario: function() {
            return usuario;
        },
        role: function() {
            return role;
        }
    };
})

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});