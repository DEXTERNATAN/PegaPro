angular.module('pegapro')
  .controller('RegisterCtrl', RegisterCtrl);
//  .run(function ($http) {
//    $http.defaults.headers.common.Authorization = 'Token token=13cd9b946da73ff1a739b4afec72701f';
//  });

function RegisterCtrl($scope, $ionicPopup, $ionicActionSheet, $state, $http, $log, $rootScope, $ionicLoading, EmpresaService, AuthService) {

  $log.debug('[RegisterCtrl] constructor()');

  $scope.user = {};
  $rootScope.cadastrado = false;

  $scope.registerUser = function() {

    $log.debug('registerUser');

    if ($scope.user.email && $scope.user.password && $scope.user.nome) {

      // verificando se o usuario já está cadastrado
      AuthService.login($scope.user.email, $scope.user.password).then(function(authenticated) {
        $rootScope.cadastrado = true;
        if ($rootScope.cadastrado) {
          alert('Usuário já cadastrado. Faça login.');
          $state.go('login');
        }
      }, function(error) {

        // Se o usuario não está cadastrado, então cadastra
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

        EmpresaService.registerUsers(dadosUsuario).then(function(dados) {
          alert('Usuário cadastrado com sucesso! Faça login.');
          $state.go('login');
        }, function(erro) {
          alert('Error: Usuário não cadastrado!');
        });

      });

    } else {
      alert('Preencha os campos por favor!');
    }

  };


}