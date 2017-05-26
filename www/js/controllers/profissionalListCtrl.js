// (function() {
// 	'user strict'

angular
	.module('pegapro')
	.controller('profissionalListCtrl', profissionalListCtrl);

function profissionalListCtrl($scope, $timeout, $rootScope, profissionalService, $ionicLoading, $ionicPopup, $log, $state, $ionicFilterBar, $ionicActionSheet) {

	$log.debug('[profissionalListCtrl] constructor()');

	var vm = this;
	vm.listlength = 10;
	vm.listaProfissional = [];


	vm.show = function() {
		$ionicLoading.show({
			template: '<p>Aguarde. Carregando...</p><ion-spinner icon="lines"></ion-spinner>'
		});
	};

	vm.hide = function() {
		$ionicLoading.hide();
	};

	profissionalService.getProfissional().then(function(response) {
		vm.listaProfissional = response;
	}).catch(function(fallback) {
		var alertPopup = $ionicPopup.alert({
			title: 'Problema no servidor!',
			template: 'Falha ao carregar os dados!'
		})
	}).finally(function($ionicLoading) {
		vm.hide($ionicLoading);
	})

	// Filtra as requisições de busca
	vm.showFilterBar = function() {
		filterBarInstance = $ionicFilterBar.show({
			items: $scope.listaProfissional,
			update: function(filteredItems, filterText) {
				$scope.listaProfissional = filteredItems;
				if (filterText) {
					console.log(filterText);
				}
			}
		});
	};

	vm.showActionsheet = function() {
		vm.AtivarModal = $rootScope.isOpen;
	};

	// Função de refresh da listagem de profissionais
	vm.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
	};

	// Função para carregar mais registros na listagem
	vm.loadMore = function() {

		if (!vm.listaProfissional) {
			$scope.$broadcast('scroll.infiniteScrollComplete');
			return;
		}

		if (vm.listlength < vm.listaProfissional.length)
			vm.listlength += 1;
		$scope.$broadcast('scroll.infiniteScrollComplete');

	}

	vm.contratarServico = function() {
		$state.go('app.contratarServico');
	}

	vm.oferecerServico = function() {
		$state.go('app.oferecerServico');
	}

	vm.enviarMensagens = function() {
		$state.go('app.mensagens');
	}

	vm.favorito = function(idProfissional) {
		console.log('Favoritar', idProfissional);
	};

}

// })