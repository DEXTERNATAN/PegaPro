angular.module('pegapro')
  .controller('profissionalListCtrl', profissionalListCtrl);

function profissionalListCtrl($scope, profissionalService, $ionicLoading, $ionicPopup, $log, $state) {
  $log.debug('[profissionalListCtrl] constructor()');

  $scope.listlength = 10;

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  profissionalService.getProfissional().then(function(response) {
    $scope.listaProfissional = response;
  }).catch(function(fallback) {
    // var alertPopup = $ionicPopup.alert({
    //   title: 'Problema no servidor!',
    //   template: 'Falha ao carregar os dados!'
    // });
    alert('Falha ao carregar os dados!');
  }).finally(function($ionicLoading) {
    $scope.hide($ionicLoading);
  });

  $scope.loadMore = function() {
    if (!$scope.listaProfissional) {
      $scope.$broadcast('scroll.infiniteScrollComplete');
      return;
    }

    if ($scope.listlength < $scope.listaProfissional.length)
      $scope.listlength += 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  $scope.contratarServico = function() {
    console.log('Contratar serviço');
    $state.go('app.contratarServico');
  }

  $scope.oferecerServico = function() {
    console.log('Oferecer serviço');
    $state.go('app.oferecerServico');
  }


  $scope.enviarMensagens = function() {
    console.log('Enviar mensagens');
    $state.go('app.mensagens');
  }
  

}