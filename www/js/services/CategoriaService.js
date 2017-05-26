angular.module('pegapro')
  .service('CategoriaService', CategoriaService);

function CategoriaService($http, SERVERS) {
  
  return {
    getCategoria: function () {
      return $http.get(SERVERS.prod + 'categoria', {timeout: 3000}).then(function (response) {
        return response.data;
      });
    }
    ,
    getCategoriaId: function (id) {
      return $http.get(SERVERS.prod + 'categoria/' + id, {timeout: 3000}).then(function (response) {
        return response.data;
      });
    },    
    registerCategoria: function (dadosCategoria) {
        return $http.post(SERVERS.prod + 'user', dadosCategori, {timeout: 3000} ).
        then(function (response) {
          return response.data;
        });
    }
  };
}
