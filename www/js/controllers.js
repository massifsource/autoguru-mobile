angular.module('AutoGuru.controllers', [])

.controller('AppCtrl', function($scope, $http) {

  $scope.appData = {
    title: 'AutoGuru',
    selectedCity: {},
    selectedDistrict: {},
    cities: [],
    districts: [],

    retrieveCities: function() {
      $scope.appData.cities = {"content":[{"id":1,"name":"Иркутск"},{"id":2,"name":"Ангарск"},{"id":3,"name":"Шелехов"}],"totalPages":1,"totalElements":3,"last":true,"first":true,"numberOfElements":3,"sort":null,"size":20,"number":0};

      // Commenting out until we get something working with CORS.
      // $http({
      //   url: '//autoguru-dap.elasticbeanstalk.com/cities',
      //   dataType: 'json',
      //   method: 'GET',
      //   headers: {
      //       "Content-Type": "application/json"
      //   },
      //   params: ''
      // }).success(function(data) {
      //   $scope.appData.cities = data;
      //   console.log(data);
      // }).error(function(data) {
      //   alert("Couldn't retrieve list of cities, please verify network connection and try again.");
      // });
    },
    retrieveDistricts: function() {
      $scope.appData.districts = {"content":[{"id":1,"name":"Новоленино","cityId":1},{"id":2,"name":"Правый Берег","cityId":1},{"id":3,"name":"Левый Берег","cityId":1},{"id":4,"name":"Ангарск","cityId":2},{"id":5,"name":"Шелехов","cityId":3}],"totalPages":1,"totalElements":5,"last":true,"first":true,"numberOfElements":5,"sort":null,"size":20,"number":0};
      // $http({
      //   url: '//autoguru-dap.elasticbeanstalk.com/cities',
      //   method: 'GET'
      // }).success(function(data) {
      //   $scope.appData.districts = data;
      //   console.log(data);
      // }).error(function(data) {
      //   alert("Couldn't retrieve list of cities, please verify network connection and try again.");
      // });
    },
    setCity: function(city) {
      $scope.appData.selectedCity = city;
      $scope.appData.selectedCity.districts = angular.copy($scope.appData.districts.content);

      console.log('before');
      for (var i = 0; i < $scope.appData.selectedCity.districts.length; i++) {
        if ($scope.appData.selectedCity.districts[i].cityId !== $scope.appData.selectedCity.id) {
          $scope.appData.selectedCity.districts.splice(i, 1);
          i--;
        }
      }
      console.log('after');
      console.log($scope.appData.selectedCity.districts);

      $scope.appData.title = city.name;
    },
    setDistrict: function(district) {
      console.log('set district called');
      $scope.appData.selectedDistrict = district;
      $scope.appData.title = $scope.appData.selectedCity.name + ', ' + district.name;
    }
  }

  $scope.appData.retrieveCities();
  $scope.appData.retrieveDistricts();

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
