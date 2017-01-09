angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('login');

$stateProvider

.state('login',{
	url : '/login',
	templateUrl : 'templates/login.html',
	controller: 'LoginController'
})

.state('listagem',{
	url : '/listagem',
	templateUrl : 'templates/listagem.html',
	controller: 'ListagemController'
})

.state('contato',{
	url : '/contato',
	templateUrl : 'templates/contato.html',
	controller: 'ContatoController'
})

.state('empresaescolhida',{
	url : '/empresaescolhida/:empresa',
	templateUrl: 'templates/empresaescolhida.html',
	controller: 'EmpresaEscolhidaController'
});



})