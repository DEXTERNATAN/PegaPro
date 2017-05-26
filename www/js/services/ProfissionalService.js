angular
	.module('pegapro')
	.factory('profissionalService', profissionalService);

function profissionalService($q, $http, $log, SERVERS) {
	$log.debug('profissionalService criado com sucesso');

	var service = {
		getProfissional: getProfissional,
		getProfissionalId: getProfissionalId
	}

	return service;


	function getProfissional() {
		var promiseResult = $q.defer();
		var url = SERVERS.prod + 'profissional';
		var promise = $http.get(url);

		promise.then(function(response) {
			return promiseResult.resolve(response.data);
		})

		promise.catch(function(error) {
			return promiseResult.reject(error);
		})

		return promiseResult.promise;

	}

	function getProfissionalId(id) {
		var promiseResult = $q.defer();
		var url = SERVERS.prod + 'profissional/' + id;
		var promise = $http.get(url);

		promise.then(function(response) {
			return promiseResult.resolve(response.data);
		})

		promise.catch(function(error) {
			return promiseResult.reject(error);
		})

		return promiseResult.promise;

	}

}