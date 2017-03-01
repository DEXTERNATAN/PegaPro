angular.module('pegapro', [
  // angular modules
  'idf.br-filters',
  'ionic-ratings',
  'ui.router',
  'ionic',
  'restangular',
  'LocalStorageModule',
  'ngCordova'

])
// .run(function($httpBackend){
//   $httpBackend.whenGET('http://localhost:8100/valid')
//         .respond({message: 'This is my valid response!'});
//   $httpBackend.whenGET('http://localhost:8100/notauthenticated')
//         .respond(401, {message: "Not Authenticated"});
//   $httpBackend.whenGET('http://localhost:8100/notauthorized')
//         .respond(403, {message: "Not Authorized"});
 
//   $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
//  })

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
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