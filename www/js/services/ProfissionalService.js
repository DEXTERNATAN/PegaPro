angular.module('pegapro')
  .service('profissionalService', profissionalService);

function profissionalService($http, SERVERS) {
  
  return {
    obterProfissional: function () {
      return $http.get("https://pegaproweb.herokuapp.com"  + '/profissional').then(function (response) {
        return response.data;
      });
    },
    obterProfissionalId: function (id) {
      return $http.get("https://pegaproweb.herokuapp.com" +'/profissional/' + id).then(function (response) {
        return response.data;
      });
    },    
  };
}
