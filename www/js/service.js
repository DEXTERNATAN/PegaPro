angular.module('pegapro')
  .service('EmpresaService', EmpresaService);

function EmpresaService($http) {

  var urlProd = 'https://pegaproweb.herokuapp.com/profissional';
  
  return {
    obterEmpresas: function () {
      return $http.get(urlProd).then(function (response) {
        return response.data;
      });
    },
    obterEmpresaId: function (id) {
      return $http.get(urlProd + '/' + id).then(function (response) {
        return response.data;
      });
    },
    realizarLogin: function (dadosDoLogin) {
      return $http.get('https://pegaproweb.herokuapp.com/' + 'user', dadosDoLogin).then(function (response) {
        return response.data;
      });
    }

  }
}
