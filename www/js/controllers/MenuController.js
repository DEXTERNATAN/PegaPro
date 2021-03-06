angular.module('pegapro')
	.controller('MenuController', MenuController);

function MenuController($scope, $ionicPopup, $ionicActionSheet, $state, $http, $log, $rootScope, $ionicLoading, AuthService) {
	$scope.usuarioLogado = $rootScope.usuario;

	$scope.logout = function() {
		$rootScope.usuario = '';
		AuthService.logout();
		$state.go('login');

		window.plugins.googleplus.logout(
			function(msg) {
				//document.querySelector("#image").style.visibility = 'hidden';
				//document.querySelector("#feedback").innerHTML = msg;
			},
			function(msg) {
				//document.querySelector("#feedback").innerHTML = msg;
			}
		);


	};



	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function() {
				$ionicLoading.show({
					template: 'Logging out...'
				});

				// Facebook logout
				facebookConnectPlugin.logout(function() {
						$ionicLoading.hide();
						$state.go('login');
					},
					function(fail) {
						$ionicLoading.hide();
					});
			}
		});
	};


	$scope.enviarMensagem = function () {
		console.log('Enviar mensagens');
    	$state.go('app.mensagens');
		
	}

};