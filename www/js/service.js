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
    },
    registerUsers: function (dadosUsuario) {
      return $http.post('http://10.12.102.147:3000/user/add?api_key=1234', dadosUsuario).then(function (response) {
        return response.data;
      });
    }    

  }
}
