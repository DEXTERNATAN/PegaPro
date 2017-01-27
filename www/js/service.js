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
      return $http.get('https://pegaproweb.herokuapp.com/user/login', dadosDoLogin).then(function (response) {
        return response.data;
      });
    },
    registerUsers: function (dadosUsuario) {
        return $http.post('https://pegaproweb.herokuapp.com/user/login?email=' + dadosUsuario.email + '&password=' + dadosUsuario.senha ).
        then(function (response) {
          return response.data;
        });
    }    
  }
}
