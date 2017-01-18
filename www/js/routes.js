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

.state('mensagens',{
	url : '/mensagens',
	templateUrl : 'templates/mensagens.html'
})

.state('mapa', {
	url: '/mapa',
	templateUrl: 'templates/map.html',
	controller: 'MapCtrl'
})

.state('empresaescolhida',{
	url : '/empresaescolhida/:empresa',
	templateUrl: 'templates/empresaescolhida.html',
	controller: 'EmpresaEscolhidaController'
});



})