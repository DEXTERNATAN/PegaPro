angular.module('starter')
  .controller('ListagemController', function ($scope, EmpresaService, $ionicLoading, $ionicPopup) {

    $scope.show = function () {
      $ionicLoading.show({
        template: '<p>Aguarde...</p><ion-spinner icon="lines"></ion-spinner>'
      });
    };

    $scope.hide = function () {
      $ionicLoading.hide();
    };

    $scope.show($ionicLoading);

    EmpresaService.obterEmpresas().then(function (response) {
      $scope.listaDeEmpresas = response;
    }).catch(function (fallback) {
      var alertPopup = $ionicPopup.alert({
        title: 'Problema no servidor!',
        template: 'Falha ao carregar os dados!'
      });
    }).finally(function ($ionicLoading) {
      $scope.hide($ionicLoading);
    });

  });

angular.module('starter')
  .controller('EmpresaEscolhidaController', function ($stateParams, $scope, EmpresaService, $ionicLoading, $cordovaSocialSharing) {

    $scope.idEmpresa = $stateParams.empresa;

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

    EmpresaService.obterEmpresaId($scope.idEmpresa).then(function (response) {
      $scope.listaDeEmpresaId = response;
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


  });

angular.module('starter')
  .controller('LoginController', function ($scope, EmpresaService, $ionicPopup, $state) {

    $scope.user = {};
    $scope.user.ativo = true;

    $scope.realizarLogin = function () {

      if ($scope.user.username && $scope.user.password) {

        var dadosDoLogin = {
          params: {
            email: $scope.user.username,
            senha: $scope.user.password,
            ativo: $scope.user.ativo
          }
        }

        EmpresaService.realizarLogin(dadosDoLogin).then(function (dados) {

          $state.go('listagem');

        }, function (erro) {
          $ionicPopup.alert({
            title: 'Login Falhou',
            template: 'E-mail ou senha incorretos.'
          });
        });


      } else {
        $ionicPopup.alert({
          title: 'Login Falhou',
          template: 'Informe E-mail e senha para entrar.'
        });
      }

    };

  });

angular.module('starter')
  .controller('ContatoController', function ($scope, $cordovaEmailComposer) {

    $scope.contato = {};


    // $cordovaEmailComposer.isAvailable().then(function() {
    //    // is available
    //  }, function () {
    //    // not available
    //  });

    var email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    $cordovaEmailComposer.open(email).then(null, function () {
      // user cancelled email
      console.log('OK');
    });



  });


angular.module('starter')
  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      });



    }, function (error) {
      console.log("Could not get location");
    });
  });
