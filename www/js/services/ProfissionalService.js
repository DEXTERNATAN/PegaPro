angular.module('pegapro')
  .service('profissionalService', profissionalService);

function profissionalService($http, SERVERS) {
  
  return {
    obterProfissional: function () {
      return $http.get(SERVERS.proxy + 'profissional').then(function (response) {
        return response.data;
      });
    },
    obterProfissionalId: function (id) {
      return $http.get(SERVERS.proxy + 'profissional/' + id).then(function (response) {
        return response.data;
      });
    },    
  };
}
