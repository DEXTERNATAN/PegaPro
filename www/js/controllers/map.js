angular.module('pegapro')
  .controller('MapController', MapController);

function MapController($scope, $state, $cordovaGeolocation, $log) {
  $log.debug('[MapController] constructor()');
  var options = { timeout: 10000, enableHighAccuracy: true };

  $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
    showMap(position);
  }, function (error) {
    $log.warn('Could not get location');
    showMap();
  });

  function showMap(position) {
    var latLng;
    if (position) {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    } else {
      latLng = new google.maps.LatLng(-15.8011747,-47.8610199);
    }

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
  }
}

