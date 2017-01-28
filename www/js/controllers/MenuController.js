angular.module('pegapro')
  .controller('MenuController', MenuController);

function MenuController($scope, EmpresaService, $ionicPopup, $state, $log, $rootScope) {
	$scope.usuarioLogado = $rootScope.usuario;
  console.log('aqui',$scope.usuarioLogado);
}

