angular.module('pegapro')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, $ionicPopup, $rootScope, $log, $ionicLoading, EmpresaService, AuthService, LoginService) {
  $log.debug('[LoginController] constructor()');
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $rootScope.usuario = authenticated;
      console.log(authenticated);

      $state.go('app.listagem', {}, {
        reload: true
      });
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Falhou!',
        template: 'Usuário ou senha inválidos!'
      });
    });
  };

  $scope.registerUser = function() {
    $log.debug('registerUser');
    if ($scope.user.nome && $scope.user.sobrenome && $scope.user.email && $scope.user.choice) {


      var dadosUsuario = {
        name: $scope.user.nome,
        sobrenome: $scope.user.sobrenome,
        celular: $scope.user.celular,
        email: $scope.user.email,
        choice: $scope.user.choice,
        username: $scope.user.nome,
        password: $scope.user.password,
        token: 'dfasdfasdfasdf',
        cidade: $scope.user.cidade,
        ativo: true
      };

      $log.debug('registerUser', dadosUsuario);
      EmpresaService.registerUsers(dadosUsuario).then(function(dados) {
        $ionicPopup.alert({
          title: 'Cadastro de usuario',
          template: 'Usuario cadastrado com sucesso !'
        });
        $state.go('login');
      }, function(erro) {
        $ionicPopup.alert({
          title: 'Cadastro de usuario',
          template: 'Error: Usuário não cadastrado!'
        });
      });

    } else {
      $ionicPopup.alert({
        title: 'Dados não informandos',
        template: 'Preencha os campos por favor!'
      });
    }

  };


  var fbLoginSuccess = function(userData) {
    //alert('userData : ' + JSON.stringify(userData.authResponse.accessToken));
    facebookConnectPlugin.getLoginStatus(function(response) {
      //alert('valor response: ' + JSON.stringify(response.status));
      if (response.status == 'connected') {
        //alert('getLoginStatus' + response.status);
        facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', [],
          function onSuccess(result) {

            $ionicLoading.show({
              template: 'Aguarde...',
              duration: 3000
            }).then(function() {
              console.log("The loading indicator is now displayed");
            });

            //alert(JSON.stringify(result));
            $rootScope.usuario = {
              "nome": result.name,
              "urlFoto": result.picture.data.url,
              "token": userData.authResponse.accessToken,
              "email": result.email
            };
            //$state.go('listagem');
            //alert(JSON.stringify($rootScope.usuario.email));
            //alert(JSON.stringify($rootScope.usuario.token));

            AuthService.loginFacebook($rootScope.usuario.email, $rootScope.usuario.token).then(function(authenticated) {

              //alert(JSON.stringify(authenticated));

              $state.go('app.listagem', {}, {
                reload: true
              });
              $scope.setCurrentUsername(data.username);
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
    //alert($rootScope.usuario);
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error) {
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  $scope.facebookSignIn = function() {
    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  }

};