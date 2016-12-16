angular.module('starter')
.controller('ListagemController', function($scope, EmpresaService){

	EmpresaService.obterEmpresas().then(function(dados){
		$scope.listaDeEmpresas = dados;
	});

});

angular.module('starter')
.controller('EmpresaEscolhidaController', function($stateParams, $scope, EmpresaService){

	$scope.idEmpresa = $stateParams.empresa;

	EmpresaService.obterEmpresaId($scope.idEmpresa).then(function(dados){
		$scope.listaDeEmpresaId = dados;
	});
	
});