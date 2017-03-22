angular.module('pegapro')
  .service('profissionalService', profissionalService);

function profissionalService($http, SERVERS) {
  
  return {
    obterProfissional: function () {
      return $http.get(SERVERS.prod + 'profissional').then(function (response) {
        return response.data;
      });
    },
    obterProfissionalId: function (id) {
      return $http.get(SERVERS.prod + 'profissional/' + id).then(function (response) {
        return response.data;
      });
    },    
  };
}