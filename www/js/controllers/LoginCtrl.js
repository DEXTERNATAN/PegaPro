angular.module('pegapro')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, $scope, $state, $ionicPopup, $rootScope, $log, $ionicLoading, $q, $cordovaOauth, $cordovaGooglePlus, EmpresaService, AuthService) {

    $log.debug('[LoginController] constructor()');

    $scope.data = {};
    $rootScope.usuario = {};
    $scope.user = {};

    // Função de login direto com a base de dados
    $scope.login = function(data) {
        AuthService.login(data.username, data.password).then(function(authenticated) {
            $rootScope.usuario = authenticated;
            $state.go('app.listagem', {}, {
                reload: true
            });
            $scope.setCurrentUsername(data.username);
            $scope.setCurrentUser(authenticated);
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login Falhou!',
                template: 'Usuário ou senha inválidos!'
            });
        });
    };

    // Função de login com o facebook
    var fbLoginSuccess = function(userData) {

        facebookConnectPlugin.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', [],
                    function onSuccess(result) {
                        $ionicLoading.show({
                            template: 'Aguarde...',
                            duration: 3000
                        }).then(function() {
                            console.log("The loading indicator is now displayed");
                        });

                        $rootScope.usuario = {
                            "nome": result.name,
                            "urlFoto": result.picture.data.url,
                            "token": userData.authResponse.accessToken,
                            "email": result.email
                        };

                        AuthService.loginFacebook($rootScope.usuario.email, $rootScope.usuario.token).then(function(authenticated) {
                            $state.go('app.listagem', {}, {
                                reload: true
                            });
                            $scope.setCurrentUsername(data.username);
                            $scope.setCurrentUser(authenticated);

                        }, function(err) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login Falhou!',
                                template: 'Usuário ou senha inválidos!'
                            });
                        });
                    },
                    function onError(error) {
                        alert(JSON.stringify(error));
                    });
            }
        });
    };

    // Função do callback de erro do facebook
    var fbLoginError = function(error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
    };

    // Função do callback de sucesso do facebook
    $scope.facebookSignIn = function() {
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
    };

    // Funciona no google play
    $scope.loginGoogle = function() {

        var requestToken = '';
        var accessToken = '';
        var clientId = '333786602954-gr1rk602j6h3qboakf6h2o5m770ev7qt.apps.googleusercontent.com';
        var clientSecret = 'WwkOGHTrqAL6nP99eWqnDS94';
        var deferred = $q.defer();

        $ionicLoading.show({
            template: 'Aguarde...',
            duration: 3000
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });

        $cordovaOauth.google(clientId, ['email', 'profile']).then(function(result) {

            //$localStorage.accessToken = result.access_token;
            $scope.accessToken = result.access_token;
            deferred.resolve(result.access_token);

            $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + $scope.accessToken, {

                params: {
                    format: 'json'
                }

            }).then(function(result) {

                //console.log(JSON.stringify(result));
                $rootScope.usuario = {
                    "nome": result.data.name,
                    "urlFoto": result.data.picture,
                    "token": 'token',
                    "email": result.data.email
                };

                AuthService.loginGoogle(result.data.email, 'token').then(function(authenticated) {
                    $state.go('app.listagem', {}, {
                        reload: true
                    });
                    $scope.setCurrentUsername($rootScope.usuario.nome);
                    $scope.setCurrentUser($rootScope.usuario);
                    $ionicLoading.hide();
                }, function(err) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login Falhou!',
                        template: 'Usuário ou senha inválidos!'
                    });
                });
                console.log('Logado com sucesso!!!');
                deferred.resolve(result.data);
                $ionicLoading.hide();

            }, function(error) {
                deferred.reject({
                    message: 'here was a problem getting your profile',
                    response: error
                });
            });

        }, function(error) {
            deferred.reject({
                message: 'There was a problem signing in',
                response: error
            });
        });
    };


}