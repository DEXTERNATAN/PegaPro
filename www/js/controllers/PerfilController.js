angular.module('pegapro')
  .controller('PerfilController', PerfilController);

function PerfilController($rootScope, $scope, $log, $cordovaCamera) {
  $log.debug('[PerfilController] constructor()');

  $scope.estaEditando = false;
  $scope.textoBotao = 'Editar';
  $scope.usuarioLogado = $rootScope.usuario;
  
  $scope.tirarFoto = function(){
    var opcoes = {
      correctOrientation: true,
      quality: 70
    };
    $cordovaCamera.getPicture(opcoes).then(function(foto){
      $scope.urlFoto = foto;
      $scope.statusCamera = true;
    },function(erro){

    });
  };

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