angular.module('pegapro')
  .config(configRoutes);

function configRoutes($stateProvider, $urlRouterProvider, USER_ROLES) {

  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

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
        templateUrl: 'templates/profissionalListagem.html',
        controller: 'profissionalListCtrl'
      }
    }
    // Se quiser esconder a rota de algum usuario comum e mostrar apenas para usuarios administradores
    //,
    // data: {
    //   authorizedRoles: [USER_ROLES.admin]
    // }
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

  .state('app.comentarios', {
    url: '/comentarios',
    views: {
      'menuContent': {
        templateUrl: 'templates/comentarios.html',
        controller: 'ComentarioController'
      }
    }
  })

  .state('app.mapa', {
    url: '/mapa',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapController'
      }
    }
  })

  .state('app.mensagens', {
    url: '/mensagens',
    views: {
      'menuContent': {
        templateUrl: 'templates/mensagens.html'
      }
    }
  })

  .state('app.escolhe-perfil', {
    url: '/escolhe-perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/escolhe-perfil.html'
      }
    }
  })

  .state('registrar', {
    url: '/registrar',
    templateUrl: 'templates/registrar.html',
    controller: 'RegisterCtrl'
  })

  .state('app.profissionalDetalhes', {
    url: '/profissionalDetalhes/:empresa',
    views: {
      'menuContent': {
        templateUrl: 'templates/profissionalDetalhes.html',
        controller: 'profissionalDetailsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });

}