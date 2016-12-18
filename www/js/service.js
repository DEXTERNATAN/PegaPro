angular.module('starter')
.service('EmpresaService', function($http){

	//var url = 'https://aluracar.herokuapp.com/';
	//var url = 'http://www.boasopcoes.com.br/contatos';
	var url = 'https://pegaproweb.herokuapp.com/profissional';

	return{
		obterEmpresas : function(){
			return $http.get(url).then(function(response){
				return response.data;
			});
		},
		obterEmpresaId : function(id){
			return $http.get(url +'/'+ id).then(function(response){
				return response.data;
			});
		},
		realizarLogin : function(dadosDoLogin){
			return $http.get('https://pegaproweb.herokuapp.com/' + 'user' , dadosDoLogin).then(function(response){
				return response.data;
			});
		}

	}
});