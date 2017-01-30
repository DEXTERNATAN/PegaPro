angular.module('pegapro')
  .service('EmpresaService', EmpresaService);

function EmpresaService($http) {

  //var urlProd = 'https://pegaproweb.herokuapp.com/';
  var urlProd = 'http://localhost:3000/';
  
  return {
    obterEmpresas: function () {
      return $http.get(urlProd + 'profissional').then(function (response) {
        return response.data;
      });
    },
    obterEmpresaId: function (id) {
      return $http.get(urlProd + id).then(function (response) {
        return response.data;
      });
    },
    realizarLogin: function (dadosDoLogin) {
      return $http.get(urlProd + 'user/login', dadosDoLogin).then(function (response) {
        return response.data;
      });
    },
    registerUsers: function (dadosUsuario) {
        return $http.post(urlProd + 'user?api_key=1234', dadosUsuario ).
        then(function (response) {
          return response.data;
        });
    }    
  }
}
