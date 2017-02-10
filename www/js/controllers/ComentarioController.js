angular.module('pegapro')
  .controller('ComentarioController', ComentarioController);

function ComentarioController($scope, $state, $log) {

 $log.debug('[ComentarioController] constructor()');

  $scope.comentarios = [{
    'imagem': 'img/venkman.jpg',
    'titulo': 'Venkman',
    'descricao': 'Back off, man. I\'m a scientist.'
  }];

}
