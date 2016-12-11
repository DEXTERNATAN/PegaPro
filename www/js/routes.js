angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('listagem');

$stateProvider

.state('listagem',{
	url : '/listagem',
	templateUrl : 'templates/listagem.html',
	controller: 'ListagemController'
})

.state('empresaescolhida',{
	url : '/empresaescolhida/:empresa',
	templateUrl: 'templates/empresaescolhida.html',
	controller: 'EmpresaEscolhidaController'
});

// .state('finalizarpedido',{
// 	url : '/finalizarpedido/:carro',
// 	templateUrl : 'templates/finalizarpedido.html',
// 	controller : 'FinalizarPedidoController'
// })

// .state('login', {
// 	url : '/login',
// 	templateUrl : 'templates/login.html',
// 	controller : 'LoginController'
// })

})