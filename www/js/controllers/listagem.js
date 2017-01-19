angular.module('pegapro')
  .controller('ListagemController', ListagemController);

function ListagemController($scope, EmpresaService, $ionicLoading, $ionicPopup, $log) {
  $log.debug('[ListagemController] constructor()');

  $scope.show = function () {
    $ionicLoading.show({
      template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
    });
  };

  $scope.hide = function () {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  EmpresaService.obterEmpresas().then(function (response) {
    $scope.listaDeEmpresas = response;
  }).catch(function (fallback) {
    var alertPopup = $ionicPopup.alert({
      title: 'Problema no servidor!',
      template: 'Falha ao carregar os dados!'
    });
  }).finally(function ($ionicLoading) {
    $scope.hide($ionicLoading);
  });

}
