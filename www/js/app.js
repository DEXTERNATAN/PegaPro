angular.module('pegapro', 
  [
    // angular modules
    'idf.br-filters', 
    'ionic-ratings',

    'ui.router',
    'ionic', 
    'restangular',
    'LocalStorageModule',     
    'ngCordova',
    //'ngOpenFB',

    // app modules
    'pegapro.core',
    'pegapro.signin'
])
  // Declara as lib externas (ex. jQuery, GoogleAPI, lodash, moment, etc.)
  //.constant('google', google)
  // .constant('jQuery', jQuery)
  // .constant('_', lodash)
  // .constant('moment', moment)
  .run(runApp);

function runApp($ionicPlatform
//,ngFB
) {
  
  //facebook autenticacao
  
  // ngFB.init({ appId: '1067360726701947',  
  //             status : true, // check login status
  //             cookie : true, // enable cookies to allow the server to access the session
  //             xfbml  : true  // parse XFBML
  //           });
  //$openFB.init( {appId: '1067360726701947'} );

  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}
