angular.module('starter')
.service('EmpresaService', function($http){

	//var url = 'https://aluracar.herokuapp.com/';
	var url = 'http://www.boasopcoes.com.br/contatos';

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
		}
	}
});