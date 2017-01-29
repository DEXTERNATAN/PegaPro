angular.module('pegapro')
  .controller('PerfilController', PerfilController);

function PerfilController($rootScope, $scope, $log) {
  $log.debug('[PerfilController] constructor()');

  $scope.estaEditando = false;
  $scope.textoBotao = 'Editar';
  $scope.usuarioLogado = $rootScope.usuario;

  $scope.editarPerfil = function() {
    if($scope.estaEditando) {
       $scope.estaeditando = false;
       $scope.textoBotao = 'Editar';
    } else {
        $scope.estaEditando = true;
        $scope.textoBotao = 'Salvar';
    }
  };

}