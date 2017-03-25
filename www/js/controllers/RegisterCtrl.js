angular.module('pegapro')
  .controller('RegisterCtrl', RegisterCtrl);

//  .run(function ($http) {
//    $http.defaults.headers.common.Authorization = 'Token token=13cd9b946da73ff1a739b4afec72701f';
//  });

function RegisterCtrl($scope, $ionicPopup, $ionicActionSheet, $state, $http, $log, $rootScope, $ionicLoading,EmpresaService) {
  $log.debug('[RegisterCtrl] constructor()');

  $scope.user = {};

  $scope.estados = [{ "id": "AC", "label": "Acre" }, { "id": "AL", "label": "Alagoas" }, { "id": "AM", "label": "Amazonas" }, { "id": "AP", "label": "Amapá" }, { "id": "BA", "label": "Bahia" }, { "id": "CE", "label": "Ceará" }, { "id": "DF", "label": "Distrito Federal" }, { "id": "ES", "label": "Espírito Santo" }, { "id": "GO", "label": "Goiás" }, { "id": "MA", "label": "Maranhão" }, { "id": "MG", "label": "Minas Gerais" }, { "id": "MS", "label": "Mato Grosso do Sul" }, { "id": "MT", "label": "Mato Grosso" }, { "id": "PA", "label": "Pará" }, { "id": "PB", "label": "Paraíba" }, { "id": "PE", "label": "Pernambuco" }, { "id": "PI", "label": "Piauí" }, { "id": "PR", "label": "Paraná" }, { "id": "RJ", "label": "Rio de Janeiro" }, { "id": "RN", "label": "Rio Grande do Norte" }, { "id": "RO", "label": "Rondônia" }, { "id": "RR", "label": "Roraima" }, { "id": "RS", "label": "Rio Grande do Sul" }, { "id": "SC", "label": "Santa Catarina" }, { "id": "SE", "label": "Sergipe" }, { "id": "SP", "label": "São Paulo" }, { "id": "TO", "label": "Tocantins" }];

  $scope.searchByCEP = function () {

    if ($scope.user.endereco == null && $scope.user.cep != null && $scope.user.cep.length == 8) {

      $http.get("/ws/" + $scope.user.cep + "/json", {
        callback: "endereco"
      }
      )
        .then(function (res) {

          var data = res.data;
          $scope.user.cidade = data.localidade;
          $scope.user.bairro = data.bairro;
          $scope.user.endereco = data.logradouro;
          $scope.user.uf = data.uf;

        }, function (error) {
          alert("Error: " + JSON.stringify(error));
        });

    }



$scope.registerUser = function() {
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

  }




}


