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

    .state('app.favoritos', {
      url: '/favoritos',
      views: {
        'menuContent': {
          templateUrl: 'templates/favoritos.html'
          //,controller: 'FavoritosController'
        }
      }
    })

    .state('app.ajuda', {
      url: '/ajuda',
      views: {
        'menuContent': {
          templateUrl: 'templates/ajuda.html',
          controller: 'AjudaController'
        }
      }
    })



    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('app.profissionalDetalhes', {
      url: '/profissionalDetalhes/:empresa',
      views: {
        'menuContent': {
           templateUrl: 'templates/profissionalDetalhes.html',
           controller: 'EmpresaEscolhidaController'
        }
      }      
//      templateUrl: 'templates/profissionalDetalhes.html',
//      controller: 'EmpresaEscolhidaController'
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
