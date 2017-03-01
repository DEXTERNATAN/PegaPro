angular.module('pegapro')
    .service('LoginService', LoginService);

function LoginService($http, $q, SERVERS) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var dadosDoLogin = {
                params: {
                    email: name,
                    password: pw
                }
            };

            var User = $http.get(SERVERS.prod + 'user/login', dadosDoLogin).then(successCallback, errorCallback);

            function successCallback(response) {
                //success code
                if (name == response.data.email && pw == response.data.password) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject('Usuario e senhas invalidos.');
                }
            }

            function errorCallback(error) {
                //error code
                deferred.reject('Não foi possivel buscar os dados no servidor.');
            }

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    };

}