angular.module('pegapro')
  .controller('LoginController', LoginController);

function LoginController($scope, EmpresaService, $ionicPopup, $state, $log) {
  $log.debug('[LoginController] constructor()');

  $scope.user = {};
  $scope.user.ativo = true;

  $scope.realizarLogin = function () {

    if ($scope.user.username && $scope.user.password) {

      var dadosDoLogin = {
        params: {
          email: $scope.user.username,
          senha: $scope.user.password,
          ativo: $scope.user.ativo
        }
      }

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

}
