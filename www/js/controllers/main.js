angular.module('pegapro')
  .controller('MainController', MainController);

function MainController($log, $scope, $state, $ionicPopup, $rootScope, AuthService, AUTH_EVENTS) {
  $log.debug('[MainController] constructor()');
  
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.setCurrentUser = function(usuario) {
    $scope.usuario = usuario;
    $rootScope.usuario = usuario;
    window.localStorage.setItem('CurrentUser', JSON.stringify(usuario));
    
  };


}