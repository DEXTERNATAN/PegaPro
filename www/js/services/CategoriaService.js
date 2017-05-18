angular.module('pegapro')
  .service('CategoriaService', CategoriaService);

function CategoriaService($http, SERVERS) {
  
  return {
    getCategoria: function () {
      return $http.get(SERVERS.prod + 'categoria').then(function (response) {
        return response.data;
      });
    }
    ,
    getCategoriaId: function (id) {
      return $http.get(SERVERS.prod + 'categoria/' + id).then(function (response) {
        return response.data;
      });
    },    
    registerCategoria: function (dadosCategoria) {
        return $http.post(SERVERS.prod + 'user?api_key=291984', dadosCategoria ).
        then(function (response) {
          return response.data;
        });
    }
  };
}
