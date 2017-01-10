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
  .controller('EmpresaEscolhidaController', function ($stateParams, $scope, EmpresaService, $ionicLoading) {

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
