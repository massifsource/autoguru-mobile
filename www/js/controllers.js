angular.module('AutoGuru.controllers', [])

.controller('AppCtrl', function($scope, $http, $localStorage) {

  $scope.appData = {
    title: 'AutoGuru',
    selectedCity: {},
    selectedDistrict: {},
    cities: {content: []},
    districts: {content: []},
    cityHref: '#/app/district',
    feedbackData: {
      contact: {
        name: '',
        email: '',
        message: ''
      }
    },

    retrieveCities: function() {
      $http({
        url: '//autoguru-dap.elasticbeanstalk.com/cities',
        dataType: 'json',
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        params: ''
      }).success(function(data) {
        $scope.appData.cities = data;
        $localStorage.setObject('cityData', $scope.appData.cities);
      }).error(function(data) {
        $scope.appData.cities = $localStorage.getObject('cityData');

        if (!$scope.appData.cities || Object.getOwnPropertyNames($scope.appData.cities).length === 0) {
          $scope.appData.cities = {"content":[{"id":1,"name":"Иркутск"},{"id":2,"name":"Ангарск"},{"id":3,"name":"Шелехов"}],"totalPages":1,"totalElements":3,"last":true,"first":true,"numberOfElements":3,"sort":null,"size":20,"number":0};
          $localStorage.setObject('cityData', $scope.appData.cities);
        }
      });
    },
    retrieveDistricts: function() {
      $http({
        url: '//autoguru-dap.elasticbeanstalk.com/districts',
        method: 'GET'
      }).success(function(data) {
        $scope.appData.districts = data;
        $localStorage.setObject('districtData', $scope.appData.districts);
      }).error(function(data) {
        $scope.appData.districts = $localStorage.getObject('districtData');

        if (!$scope.appData.districts || Object.getOwnPropertyNames($scope.appData.districts).length === 0) {
          $scope.appData.districts = {"content":[{"id":1,"name":"Новоленино","cityId":1},{"id":2,"name":"Правый Берег","cityId":1},{"id":3,"name":"Левый Берег","cityId":1},{"id":4,"name":"Ангарск","cityId":2},{"id":5,"name":"Шелехов","cityId":3}],"totalPages":1,"totalElements":5,"last":true,"first":true,"numberOfElements":5,"sort":null,"size":20,"number":0};
          $localStorage.setObject('districtData', $scope.appData.districts);
        }
      });
    },
    setCity: function(city) {
      $scope.appData.selectedCity = city;
      $scope.appData.selectedCity.districts = angular.copy($scope.appData.districts.content);

      for (var i = 0; i < $scope.appData.selectedCity.districts.length; i++) {
        if ($scope.appData.selectedCity.districts[i].cityId !== $scope.appData.selectedCity.id) {
          $scope.appData.selectedCity.districts.splice(i, 1);
          i--;
        }
      }

      $scope.appData.cityHref = ($scope.appData.selectedCity.districts.length <= 1) ? '#/app/main-menu' : '#/app/district';
      $scope.appData.title = city.name;
    },
    setDistrict: function(district) {
      $scope.appData.selectedDistrict = district;
      $scope.appData.title = $scope.appData.selectedCity.name + ', ' + district.name;
    },
    sendFeedback: function() {
      // Waiting on Nikolay for server end point.
      console.log("send feedback method called!");
      console.log($scope.appData.feedbackData);
    }
  }

  $scope.appData.retrieveCities();
  $scope.appData.retrieveDistricts();

})
.controller('MapCtrl', function($scope, $cordovaGeolocation) {
  document.addEventListener("deviceready", onDeviceReady, false);
  var options = {timeout: 10000, maximumAge: 30000, enableHighAccuracy: false};

  function onDeviceReady() {
    function initialize() {
      console.log("initialize map");
      var pos;
      var myLatlng;
      $cordovaGeolocation.getCurrentPosition(options).then(function(pos) {
        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map)

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: 'img/location-16x16.png'
        });

        $scope.map = map;
        $scope.marker = marker;
        $scope.myLatlng = myLatlng;

        $ionicLoading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    }
    var isMapFrozen = false;

    function freezeMap() {
      isMapFrozen = true;
    }
    initialize();
    function updateLoc(pos) {
      if(!$scope.map) {
        initialize();
        return;
      }

      $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      if (!isMapFrozen) {
        console.log("Center map");
        $scope.map.setCenter($scope.myLatlng);
      }

      console.log("updateLoc");
      $scope.marker.setMap(null);
      $scope.marker.setMap($scope.map);
      $scope.marker.setPosition($scope.myLatlng);
    }
    function updateLocError(error) {
      alert('Unable to get location: ' + error.message);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(map, 'dragstart', freezeMap);

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }
      isMapFrozen = false;
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      $cordovaGeolocation.getCurrentPosition(options).then(function(pos) {
        $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter($scope.myLatlng);
        console.log("loading location");
        $scope.marker.setMap(null);
        $scope.marker.setMap($scope.map);
        $scope.marker.setPosition($scope.myLatlng);
        $ionicLoading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    var wpid = $cordovaGeolocation.watchPosition(options).then(updateLoc, updateLocError);
  }
})
.controller('MainMenuCtrl', function($scope, $cordovaSocialSharing) {
   $scope.socialShare = function(options) {
     $cordovaSocialSharing.share("Checkout AutoGuru app", "AutoGuru App", "www/img/ionic.png", "http://auto-guru.net");
    };
});
