angular.module('AutoGuru.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
    .controller('ContactController', ['$scope', '$http',  function($scope, $http) {

      $scope.sendContact = function() {

        var data = {
          name: this.contact.name,
          email: this.contact.email,
          message: this.contact.message
        };

        console.log(data);

        $http.post("http://192.168.1.189/app_dev.php/api/contact/", data);

      }

    }])
    .controller("ExampleController", function($scope, $cordovaSocialSharing) {

      $scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
      }

      $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
          $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
          alert("Cannot share on Twitter");
        });
      }

    })

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {

  function initialize() {
      console.log('Map.Ctrl.initialize()')
    var myLatlng = new google.maps.LatLng(52.2666667, 104.3333333);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map)

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }


  google.maps.event.addDomListener(window, 'load', initialize);
        initialize();
  $scope.centerOnMe = function() {
      console.log('centerOnMe')

    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
    console.log('getCurrentPosition')
    navigator.geolocation.getCurrentPosition(function(pos) {
        console.log('test1')
        console.log('position=')
        console.log(pos.coords.latitude)
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        console.log('test2')
      $ionicLoading.hide();
        console.log('test3')
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

});
