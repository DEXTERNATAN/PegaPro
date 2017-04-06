(function() {
     'use strict';

    angular
        .module('pegapro')
        .directive('lowercase', lowercase);

    lowercase.$inject = ['$log'];

    function lowercase($log) {
        $log.debug('toLowerCase create directives');
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(input) {
                    return input ? input.toLowerCase() : "";
                });
                element.css("text-transform", "lowercase");
            }
        };
    }

})();

