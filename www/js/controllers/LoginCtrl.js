angular.module('pegapro')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, $ionicPopup, $rootScope, AuthService, LoginService) {

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
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

}



// function LoginCtrl($scope, $state, $ionicPopup, $rootScope, AuthService, LoginService) {

//   $scope.data = {};

//   $scope.login = function() {
//     LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
//       $rootScope.usuario = data;
//       $state.go('app.listagem');
//     }).error(function(data) {
//       var alertPopup = $ionicPopup.alert({
//         title: 'Login failed!',
//         template: 'Please check your credentials!'
//       });
//     });
//   };
// }

// function LoginController($scope, EmpresaService, $ionicPopup, $state, $log, $rootScope, $ionicLoading) {

//   $log.debug('[LoginController] constructor()');

//   $scope.user = {};

//   $scope.realizarLogin = function() {

//     if ($scope.user.username && $scope.user.password) {

//       var dadosDoLogin = {
//         params: {
//           email: $scope.user.username,
//           password: $scope.user.password
//         }
//       };

//       EmpresaService.realizarLogin(dadosDoLogin).then(function(dados) {
//         $rootScope.usuario = dados;
//         $state.go('app.listagem');
//       }, function(erro) {
//         $ionicPopup.alert({
//           title: 'Login Falhou',
//           template: 'Usuário ou senha inválidos.'
//         });
//       });

//     } else {
//       $ionicPopup.alert({
//         title: 'Login Falhou',
//         template: 'Informe E-mail e senha para entrar.'
//       });
//     }

//   };


//   $scope.registerUser = function() {
//     $log.debug('registerUser');
//     if ($scope.user.nome && $scope.user.sobrenome && $scope.user.email && $scope.user.choice) {


//       var dadosUsuario = {
//         name: $scope.user.nome,
//         sobrenome: $scope.user.sobrenome,
//         celular: $scope.user.celular,
//         email: $scope.user.email,
//         choice: $scope.user.choice,
//         username: $scope.user.nome,
//         password: $scope.user.password,
//         token: 'dfasdfasdfasdf',
//         cidade: $scope.user.cidade,
//         ativo: true
//       };

//       $log.debug('registerUser', dadosUsuario);
//       EmpresaService.registerUsers(dadosUsuario).then(function(dados) {
//         $ionicPopup.alert({
//           title: 'Cadastro de usuario',
//           template: 'Usuario cadastrado com sucesso !'
//         });
//         $state.go('login');
//       }, function(erro) {
//         $ionicPopup.alert({
//           title: 'Cadastro de usuario',
//           template: 'Error: Usuário não cadastrado!'
//         });
//       });

//     } else {
//       $ionicPopup.alert({
//         title: 'Dados não informandos',
//         template: 'Preencha os campos por favor!'
//       });
//     }

//   };


//   var fbLoginSuccess = function(userData) {

//     facebookConnectPlugin.getLoginStatus(function(response) {
//       //alert('valor response: ' + JSON.stringify(response.status));
//       if (response.status == 'connected') {
//         //alert('getLoginStatus' + response.status);
//         facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', [],
//           function onSuccess(result) {
//             //alert(JSON.stringify(result.picture.data.url));
//             $rootScope.usuario = { "nome" : result.name, "urlFoto" : result.picture.data.url ,"email" : result.email};
//             $state.go('app.listagem');
//           },
//           function onError(error) {
//             alert(JSON.stringify(error));
//           });

//       }

//     });
//   };

//   // This is the fail callback from the login method
//   var fbLoginError = function(error) {
//     console.log('fbLoginError', error);
//     $ionicLoading.hide();
//   };

//   $scope.facebookSignIn = function() {
//     facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
//   }

// };