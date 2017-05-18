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
			template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
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
	$scope.contratarServicoCtrl = function() {
		$log.debug('contratarServicoCtrl');
		$scope.Contrato = {
            name: $scope.Contrato.descricao,
			contato: $scope.Contrato.contato,
			categoria: $scope.Contrato.categoria,
            cep: $scope.Contrato.cep,
		    descricao: $scope.Contrato.descricao
		};
		console.log($scope.Contrato);
		ServicoService.registerServico($scope.Contrato).then(function(response) {
			//$state.go('app.mensagens');
            console.log('Cadastrado com suceso')
		}).catch(function(fallback) {

			$ionicPopup.alert({
				title: 'Cadastro de serviço',
				template: 'Falha ao publicar serviço!'
			});

		}).finally(function($ionicLoading) {
			$scope.hide($ionicLoading);
		});


	};

};