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
          senha: $scope.user.password,
          ativo: true
        }
      };

      EmpresaService.realizarLogin(dadosDoLogin).then(function (dados) {

        $state.go('listagem');

      }, function (erro) {
        $ionicPopup.alert({
          title: 'Login Falhou',
          template: 'E-mail ou senha incorretos.'
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
            nome: $scope.user.nome,
            sobrenome: $scope.user.sobrenome,
            email: $scope.user.email,
            choice: $scope.user.choice,
            ativo: true
        };
      
      $log.debug('registerUser', dadosUsuario);
      EmpresaService.registerUsers(dadosUsuario).then(function (dados) {
        
        //$state.go('listagem');
      }, function (erro) {
        $ionicPopup.alert({
          title: 'Usuario não cadastrado',
          template: 'Error:' + erro.message
        });
      });

    } else {
      $ionicPopup.alert({
        title: 'Dados não informandos',
        template: 'Preencha os campos por favor!'
      });
    }

  };

}
