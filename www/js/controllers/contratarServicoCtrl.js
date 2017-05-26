angular.module('pegapro')
	.controller('contratarServicoCtrl', contratarServicoCtrl);

function contratarServicoCtrl($scope, $log, $ionicPopup, $state, $ionicLoading, ServicoService, CategoriaService, CidadeService) {

	$log.debug('[contratarServicoCtrl] constructors()');
	$scope.selectedCategoria = null;
	// Objeto Serviço
	$scope.Contrato = {
		name: null,
		contato: null,
		categoria: null,
		cep: null,
		descricao: null
	};


	$scope.show = function() {
		$ionicLoading.show({
			template: '<p>Aguarde. Carregando...</p><ion-spinner icon="lines"></ion-spinner>'
		});
	};

	$scope.hide = function() {
		$ionicLoading.hide();
	};

	$scope.show($ionicLoading);



	CategoriaService.getCategoria().then(function(response) {
		$scope.categorias = response;
	}).catch(function(fallback) {
		alert('Falha ao carregar os dados!');
	}).finally(function($ionicLoading) {
		$scope.hide($ionicLoading);
	});

	// Função para cadastrar um serviço
	$scope.contratarServicoCtrl = function(form) {

		$log.debug('contratarServicoCtrl');

		if (form.$valid) {

			$scope.Contrato = {
				name: $scope.Contrato.descricao,
				contato: $scope.Contrato.contato,
				categoria: $scope.Contrato.categoria,
				cep: $scope.Contrato.cep,
				descricao: $scope.Contrato.descricao
			};
			console.log($scope.Contrato);
			ServicoService.registerServico($scope.Contrato).then(function(response) {
				//console.log('Cadastrado com suceso')
				$ionicPopup.alert({
					title: 'Publicação de serviço',
					template: 'Publicação realizada com sucesso!'
				});

				$state.go('app.mensagens');

			}).catch(function(fallback) {

				$ionicPopup.alert({
					title: 'Publicação de serviço',
					template: 'Falha ao publicar serviço!'
				});

			}).finally(function($ionicLoading) {
				$scope.hide($ionicLoading);
			});
		} else {
			$ionicPopup.alert({
				title: 'Publicação de serviço',
				template: 'Por favor! Preencha os campos do formulário.'
			});
		}

	};

};