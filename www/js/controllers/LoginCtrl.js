angular.module('pegapro')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, $scope, $state, $ionicPopup, $rootScope, $log, $ionicLoading, $q, $cordovaOauth, $cordovaGooglePlus, EmpresaService, AuthService) {

  $log.debug('[LoginController] constructor()');
  $scope.data = {};
  $rootScope.usuario = {};
  $scope.user = {};

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

  $scope.registerUser = function(user) {
    $log.debug('registerUser');

    console.log('valor do objeto: ', $scope.user);
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

  // This is the fail callback from the login method
  var fbLoginError = function(error) {
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  $scope.facebookSignIn = function() {
    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  };

  $scope.googleSignIn = function() {

    //   $cordovaOauth.google("885976366456-skk1cok5v98j66q3oc58fv2tvmf7o9fu.apps.googleusercontent.com", ["email", "profile"]).then(function(result) {

    //     alert('Sucesso 002: ' + JSON.stringify(result));

    //     $http.get("https://www.googleapis.com/plus/v1/people/me", {
    //         params: {
    //           access_token: result.access_token
    //         }
    //       })
    //       .then(function(res) {
    //         // success callback
    //         alert("Sucesso: " + JSON.stringify(res.data));
    //         $rootScope.usuario = {
    //           "nome": res.data.displayName,
    //           "urlFoto": res.data.url,
    //           "token": result.access_token,
    //           "email": res.data.emails.value[0]
    //         };
    //         alert('usuario: ' + JSON.stringify($rootScope.usuario));

    //       }, function(error) {
    //         alert("Error: " + JSON.stringify(error));
    //       });

    //   }, function(error) {
    //     alert('Error');
    //   });

    $ionicLoading.show({
      template: 'Aguarde...',
      duration: 3000
    }).then(function() {
      console.log("The loading indicator is now displayed");
    });

    window.plugins.googleplus.login({},
      function(obj) {

        $rootScope.usuario = {
          "nome": obj.displayName,
          "urlFoto": obj.imageUrl,
          "token": 'obj',
          "email": obj.email
        };

        AuthService.loginGoogle(obj.email, 'token').then(function(authenticated) {
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

        //alert('sucesso' + JSON.stringify(obj));
        //alert('sucesso' + JSON.stringify($rootScope.usuario));

      },
      function(msg) {
        // document.querySelector("#feedback").innerHTML = "error: " + msg;
        alert('error' + JSON.stringify(obj));
      }
    );

  };


  $scope.googleLogout = function() {
    window.plugins.googleplus.logout(
      function(msg) {
        // document.querySelector("#image").style.visibility = 'hidden';
        // document.querySelector("#feedback").innerHTML = msg;
        alert('error' + JSON.stringify(msg));
      },
      function(msg) {
        alert('error' + JSON.stringify(msg));
        // document.querySelector("#feedback").innerHTML = msg;
      }
    );

  };




}