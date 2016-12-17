angular.module('starter')
	.controller('ListagemController', function($scope, EmpresaService, $ionicLoading, $ionicPopup) {

		$scope.show = function() {
			$ionicLoading.show({
				template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
			});
		};

		$scope.hide = function() {
			$ionicLoading.hide();
		};

		$scope.show($ionicLoading);

		EmpresaService.obterEmpresas().then(function(response) {
			$scope.listaDeEmpresas = response;
		}).catch(function(fallback) {
			var alertPopup = $ionicPopup.alert({
				title: 'Problema no servidor!',
				template: 'Falha ao carregar os dados!'
			});
		}).finally(function($ionicLoading) {
			$scope.hide($ionicLoading);
		});

	});

angular.module('starter')
	.controller('EmpresaEscolhidaController', function($stateParams, $scope, EmpresaService, $ionicLoading) {

		$scope.idEmpresa = $stateParams.empresa;

		$scope.show = function() {
			$ionicLoading.show({
				template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
			});
		};

		$scope.hide = function() {
			$ionicLoading.hide();
		};

		$scope.show($ionicLoading);

		EmpresaService.obterEmpresaId($scope.idEmpresa).then(function(response) {
			$scope.listaDeEmpresaId = response;
		}).catch(function(fallback) {
			var alertPopup = $ionicPopup.alert({
				title: 'Problema no servidor!',
				template: 'Falha ao carregar os dados!'
			});
		}).finally(function($ionicLoading) {
			$scope.hide($ionicLoading);
		});

	});