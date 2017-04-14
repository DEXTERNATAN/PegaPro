angular.module('pegapro')
  .service('profissionalService', profissionalService);

function profissionalService($http, SERVERS) {
  
  return {
    getProfissional: function () {
      return $http.get(SERVERS.proxy + 'profissional').then(function (response) {
        return response.data;
      });
    },
    getProfissionalId: function (id) {
      return $http.get(SERVERS.proxy + 'profissional/' + id).then(function (response) {
        return response.data;
      });
    },    
  };
}
