angular.module('pegapro', [
  
  // angular modules
  'ionic',
  'ngCordova',
  'ngCordovaOauth',
  'idf.br-filters',
  'ionic-ratings',
  'ui.router',
  'restangular',
  'LocalStorageModule',
  'ion-floating-menu'
  

])

.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      alert('Passei aqui P0');
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        alert('Passei aqui P1');
        event.preventDefault();
        $state.go($state.current, {}, {
          reload: true
        });
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login' && next.name !=="registrar") {    
        event.preventDefault();
        alert('Passei aqui P2');
        $state.go('login');
      }
    }
  });
})


.run(runApp);

function runApp($ionicPlatform) {

  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}