angular.module('pegapro')
  .controller('profissionalDetailsCtrl', profissionalDetailsCtrl);

function profissionalDetailsCtrl($stateParams, $scope, profissionalService, $ionicLoading, $cordovaSocialSharing, $log,  $ionicPopup) {
  $log.debug('[profissionalDetailsCtrl] constructor()');

  $scope.idProfissional = $stateParams.empresa;

  // Rating - set the rate and max variables
  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',
    iconOff: 'ion-ios-star-outline',
    iconOnColor: 'rgb(255, 201, 0)',
    iconOffColor: 'rgb(255, 201, 0)',
    rating: 2,
    minRating: 1,
    callback: function (rating) {
      $scope.ratingsCallback(rating);
      $scope.ratingAtual = rating;
    }
  };

  $scope.ratingsCallback = function (rating) {
    console.log('Selected rating is : ', rating);
    $scope.ratingAtual = rating;
  };

  // Loading
  $scope.show = function () {
    $ionicLoading.show({
      template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
    });
  };

  $scope.hide = function () {
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  profissionalService.obterProfissionalId($scope.idProfissional).then(function (response) {
    $scope.listaProfissionalId = response;
    console.log(response.rating);
    if (response.rating !== undefined) {
      $scope.ratingsObject.rating = response.rating;
    } else {
      $scope.ratingsObject.rating = 1;
    };

  }).catch(function (fallback) {
    var alertPopup = $ionicPopup.alert({
      title: 'Problema no servidor!',
      template: 'Falha ao carregar os dados!'
    });
  }).finally(function ($ionicLoading) {
    $scope.hide($ionicLoading);
  });

  // Compartilhamento em redes sociais
  $scope.shareAnywhere = function () {
    //$cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
    $cordovaSocialSharing
      .share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com") // Share via native share sheet
      .then(function (result) {
        // Success!
      }, function (err) {
        // An error occured. Show a message to the user
      });
  }


}
