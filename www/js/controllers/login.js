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
          senha: $scope.user.password
          //ativo: true
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

}
