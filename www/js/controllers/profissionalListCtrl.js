angular.module('pegapro')
  .controller('profissionalListCtrl', profissionalListCtrl);

function profissionalListCtrl($scope, profissionalService, $ionicLoading, $ionicPopup, $log,) {
  $log.debug('[profissionalListCtrl] constructor()');

  $scope.show = function () {
    $ionicLoading.show({
      template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
    });
  };

  $scope.hide = function () {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  profissionalService.obterProfissional().then(function (response) {
    $scope.listaProfissional = response;
    angular.forEach($scope.listaProfissional, function(profissional) {
      var _dateString = profissional.firstName + ", ";
      console.log("  ccccc "+_dateString);


    });
  }).catch(function (fallback) {
    var alertPopup = $ionicPopup.alert({
      title: 'Problema no servidor!',
      template: 'Falha ao carregar os dados!'
    });
  }).finally(function ($ionicLoading) {
    $scope.hide($ionicLoading);
  });

}
