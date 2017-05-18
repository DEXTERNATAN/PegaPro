angular.module('pegapro')
  .service('ServicoService', ServicoService);

function ServicoService($http, SERVERS) {
  
  return {
    getServico: function () {
      return $http.get(SERVERS.prod + 'servico').then(function (response) {
        return response.data;
      });
    },
    getServicoId: function (id) {
      return $http.get(SERVERS.prod + 'servico/' + id).then(function (response) {
        return response.data;
      });
    },    
    registerServico: function (dadosServico) {
        return $http.post(SERVERS.prod + 'servico?api_key=291984', dadosServico ).
        then(function (response) {
          return response.data;
        });
    }
  };
}
