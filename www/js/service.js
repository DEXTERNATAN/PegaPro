angular.module('pegapro')
  .service('EmpresaService', EmpresaService);

function EmpresaService($http) {

  var url = 'https://pegaproweb.herokuapp.com/profissional';

  return {
    obterEmpresas: function () {
      return $http.get(url).then(function (response) {
        return response.data;
      });
    },
    obterEmpresaId: function (id) {
      return $http.get(url + '/' + id).then(function (response) {
        return response.data;
      });
    },
    realizarLogin: function (dadosDoLogin) {
      return $http.get('https://pegaproweb.herokuapp.com/' + 'user', dadosDoLogin).then(function (response) {
        return response.data;
      });
    }

  }
}

angular.module('pegapro')
.service('UserService', function() {
	// For the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
