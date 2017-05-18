angular.module('pegapro')
	.controller('oferecerServicoCtrl', oferecerServicoCtrl);

function oferecerServicoCtrl($scope, $log, $ionicPopup, $state, $ionicLoading, ServicoService, CategoriaService, CidadeService) {

	$log.debug('[oferecerServicoCtrl] constructors()');
	$scope.selectedCategoria = null;
	// Objeto Serviço
	$scope.Servico = {
		name: null,
		categoria: null,
		cidade: null,
		telefone: null,
		cartao: null,
		contato: null,
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

	CidadeService.getCidade().then(function(response) {
		$scope.cidades = response.geonames;
		console.log('valor: ', response.geonames);
		//adminCode1 // adminName1
	}).catch(function(fallback) {
		alert('Falha ao carregar os dados!');
	}).finally(function($ionicLoading) {
		$scope.hide($ionicLoading);
	});

	// Buscando os servicos cadastrados
	ServicoService.getServico().then(function(response) {
		$scope.servicos = response;

		$ionicLoading.show({
			template: 'Aguarde...',
			duration: 3000
		}).then(function() {
			console.log("The loading indicator is now displayed");
		});

	}).catch(function(fallback) {
		$scope.servicos = 'Não existe servicos cadastrados para você no momento...'
	}).finally(function($ionicLoading) {
		$ionicLoading.hide();
	});

	$ionicLoading.hide();

	// Função para cadastrar um serviço
	$scope.oferecerServicoCtrl = function() {
		$log.debug('oferecerServicoCtrl');
		$scope.Servico = {
			name: $scope.Servico.descricao,
			categoria: $scope.Servico.categoria,
			cidade: $scope.Servico.cidade,
			telefone: $scope.Servico.telefone,
			cartao: $scope.Servico.cartao,
			contato: $scope.Servico.contato,
			descricao: $scope.Servico.descricao
		};
		console.log($scope.Servico);
		ServicoService.registerServico($scope.Servico).then(function(response) {
			$state.go('app.mensagens');
			// $ionicPopup.alert({
			// 	title: 'Cadastro de serviço',
			// 	template: 'Publicação realizada com sucesso!'
			// });
			// var confirmPopup = $ionicPopup.confirm({
			// 	title: 'Popup title',
			// 	template: 'Popup text',
			// 	cancelText: 'Custom cancel',
			// 	okText: 'Custom ok'
			// }).then(function(res) {
			// 	if (res) {
			// 		console.log('confirmed');
			// 	}
			// });
			//
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