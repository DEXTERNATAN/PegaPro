angular.module('pegapro')
  .config(configRoutes);

function configRoutes($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('login');

  $stateProvider
  .state('app', {
      url: '/app',
      templateUrl: 'templates/menu.html',
      abstract: true,
      controller: 'MenuController'
    })

    .state('app.listagem', {
      url: '/listagem',
      views: {
        'menuContent': {
          templateUrl: 'templates/listagem.html',
          controller: 'ListagemController'
        }
      }
    })

    .state('app.perfil', {
      url: '/perfil',
      views: {
        'menuContent': {
          templateUrl: 'templates/perfil.html',
          controller: 'PerfilController'
        }
      }
    })

    .state('app.profissionais', {
      url: '/empresaescolhida/:empresa',
      views : {
        'menuContent' : {
          templateUrl: 'templates/empresaescolhida.html',
          controller: 'EmpresaEscolhidaController'
        }
      }
      
    })



    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    });


  // CODE OLD
  // $stateProvider
  //   .state('login', {
  //     url: '/login',
  //     templateUrl: 'templates/login.html',
  //     controller: 'LoginController'
  //   })

  //   .state('listagem', {
  //     url: '/listagem',
  //     templateUrl: 'templates/listagem.html',
  //     controller: 'ListagemController'
  //   })

  //   .state('mensagens', {
  //     url: '/mensagens',
  //     templateUrl: 'templates/mensagens.html'
  //   })

  //   .state('registrar', {
  //     url: '/registrar',
  //     templateUrl: 'templates/registrar.html',
  //     controller: 'LoginController'
  //   })    

  //   .state('mapa', {
  //     url: '/mapa',
  //     templateUrl: 'templates/map.html',
  //     controller: 'MapController'
  //   })

  //   .state('empresaescolhida', {
  //     url: '/empresaescolhida/:empresa',
  //     templateUrl: 'templates/empresaescolhida.html',
  //     controller: 'EmpresaEscolhidaController'
  //   });


}
