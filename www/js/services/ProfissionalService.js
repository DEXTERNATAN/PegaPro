angular.module('pegapro')
  .service('profissionalService', profissionalService);

function profissionalService($http, SERVERS) {
  
  return {
    getProfissional: function () {
      return $http.get(SERVERS.prod + 'profissional').then(function (response) {
        return response.data;
      });
    },
    getProfissionalId: function (id) {
      return $http.get(SERVERS.prod + 'profissional/' + id).then(function (response) {
        return response.data;
      });
    },    
  };
}
