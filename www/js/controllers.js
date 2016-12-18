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
		$scope.ratingAtual = 2 || $scope.listaDeEmpresaId;
		// Rating - set the rate and max variables
		$scope.ratingsObject = {
			iconOn: 'ion-ios-star',
			iconOff: 'ion-ios-star-outline',
			iconOnColor: 'rgb(255, 201, 0)',
			iconOffColor: 'rgb(255, 201, 0)',
			rating: 2 || $scope.listaDeEmpresaId,
			minRating: 1,
			callback: function(rating) {
				$scope.ratingsCallback(rating);
				$scope.ratingAtual = rating;
			}
		};

		$scope.ratingsCallback = function(rating) {
			console.log('Selected rating is : ', rating);
			$scope.ratingAtual = rating;
		};


		// Loading
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

angular.module('starter')
	.controller('LoginController', function($scope, EmpresaService, $ionicPopup, $state) {

		$scope.user = {};
		$scope.user.ativo = true;

		$scope.realizarLogin = function() {

			var dadosDoLogin = {
				params : {
					email : $scope.user.username,
					senha : $scope.user.password,
					ativo : $scope.user.ativo
				}
			};

			EmpresaService.realizarLogin(dadosDoLogin).then(function(dados){
				$state.go('listagem');
			},function(erro){
				$ionicPopup.alert({
					title : 'Login Falhou',
					template : 'E-mail ou senha incorretos.'
				});
			});

			console.log('Valor: ', $scope.user);

		};

	});