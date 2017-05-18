    angular
        .module('pegapro')
        .service('CidadeService', CidadeService);

    function CidadeService($http, $log) {
        $log.debug('CidadeService created');

        var URL = "http://www.geonames.org/childrenJSON?geonameId=3469034";

        return {
            getCidade: function() {
                return $http.get(URL).then(function(response) {
                    return response.data;
                });
            }
        };

    }
