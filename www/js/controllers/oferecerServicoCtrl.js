angular.module('pegapro')
	.controller('oferecerServicoCtrl', oferecerServicoCtrl);

function oferecerServicoCtrl($scope, $log, $rootScope, $ionicPopup, $state, $ionicLoading, ServicoService, CategoriaService, CidadeService, EmpresaService, profissionalService) {


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
			template: '<p>Aguarde. Carregando...</p><ion-spinner icon="lines"></ion-spinner>'
		});
	};

	$scope.hide = function() {
		$ionicLoading.hide();
	};

	$scope.show($ionicLoading);

	$scope.BuscaProfissional = function() {
		console.log('BuscaProfissional');
		profissionalService.getProfissional().then(function(response) {
			$scope.listaProfissional = response;
		}).catch(function(fallback) {
			var alertPopup = $ionicPopup.alert({
				title: 'Problema no servidor!',
				template: 'Falha ao carregar os dados!'
			});

		}).finally(function($ionicLoading) {
			$scope.hide($ionicLoading);
		});

	}


	// Carga das categorias
	CategoriaService.getCategoria().then(function(response) {
		$scope.categorias = response;
	}).catch(function(fallback) {
		alert('Falha ao carregar os dados!');
	}).finally(function($ionicLoading) {
		$scope.hide($ionicLoading);
	});

	// Carga das cidades
	CidadeService.getCidade().then(function(response) {
		$scope.cidades = response.geonames;
	}).catch(function(fallback) {
		alert('Falha ao carregar os dados!');
	}).finally(function($ionicLoading) {
		$scope.hide($ionicLoading);
	});

	// Buscando os servicos cadastrados
	ServicoService.getServico().then(function(response) {
		$scope.show($ionicLoading);
		$scope.servicos = response;
	}).catch(function(fallback) {
		$scope.servicos = 'Não existe servicos cadastrados para você no momento...'
	}).finally(function($ionicLoading) {
		$ionicLoading.hide();
	});

	// Função para cadastrar um serviço
	$scope.oferecerServicoCtrl = function(form) {
		$log.debug('oferecerServicoCtrl');

		if (form.$valid) {

			console.log('Formulario válido');

			$scope.Profissional = {
				name: $scope.Servico.descricao,
				idUsuario: $rootScope.usuario._id,
				categoria: $scope.Servico.categoria,
				cidade: $scope.Servico.cidade,
				nu_cpf: "",
				telefone: $scope.Servico.telefone,
				cartao: $scope.Servico.cartao,
				contato: $scope.Servico.contato,
				descricao: $scope.Servico.descricao,
				dt_criacao: new Date()
			};

			console.log($scope.Profissional);


			profissionalService.registerProfissional($scope.Profissional).then(function(response) {
				
				$state.go('app.listagem', {}, {
					reload: true,
					inherit: false
				});
				
			}).catch(function(fallback) {

				$ionicPopup.alert({
					title: 'Cadastro de serviço',
					template: 'Falha ao publicar serviço!'
				});

			}).finally(function($ionicLoading) {
				$scope.BuscaProfissional();
				$scope.hide($ionicLoading);
			});


		} else {
			$ionicPopup.alert({
				title: 'Cadastro de serviço',
				template: 'Por favor! Preencha os campos do formulário.'
			});
		}



	};

};