angular.module('pegapro')
  .controller('LoginController', LoginController);

function LoginController($scope, EmpresaService, $ionicPopup, $state, $log) {
  $log.debug('[LoginController] constructor()');

  $scope.user = {};

  $scope.realizarLogin = function () {

    if ($scope.user.username && $scope.user.password) {

      var dadosDoLogin = {
        params: {
          email: $scope.user.username,
          password: $scope.user.password
          //ativo: true
        }
      };

      EmpresaService.realizarLogin(dadosDoLogin).then(function (dados) {
        console.log(dados);
        $state.go('login');

      }, function (erro) {
        //console.log(erro.data);
        $ionicPopup.alert({
          title: 'Login Falhou',
          template: 'Usuário ou senha inválidos.'
        });
      });

    } else {
      $ionicPopup.alert({
        title: 'Login Falhou',
        template: 'Informe E-mail e senha para entrar.'
      });
    }

  };


  $scope.registerUser = function () {
    $log.debug('registerUser');
    if ($scope.user.nome && $scope.user.sobrenome && $scope.user.email && $scope.user.choice) {
      

        var dadosUsuario = {
              name: $scope.user.nome,
              sobrenome: $scope.user.sobrenome,
              celular: "33943030",
              email: $scope.user.email,
              choice: $scope.user.choice,
              username: "natal",
              password: "123456",
              token: "dfasdfasdfasdf",
              cidade: $scope.user.cidade,
              ativo: true
        };
      
      $log.debug('registerUser', dadosUsuario);
      EmpresaService.registerUsers(dadosUsuario).then(function (dados) {
        $ionicPopup.alert({
          title: 'Cadastro de usuario',
          template: 'Usuario cadastrado com sucesso !'
        });
        $state.go('listagem');
      }, function (erro) {
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


    var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        //var user = UserService.getUser('facebook');
        $state.go('listagem');
        /*if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
          $state.go('listagem');
        }else{
          $state.go('listagem');
        }
        */
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  }
}
