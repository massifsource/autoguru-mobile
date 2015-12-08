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

    roadHelpData: {
      phoneNumbers: [
        {link: "tel: {{18062822399}}", label: "Прокол Колеса", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Доставка Бензина", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Эвакуатор/Буксировка", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Аккумулятор/Отогрев", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Вскрытие Замка", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Трезвый Водитель", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"},
        {link: "tel: {{18062822399}}", label: "Другое", icon: "svg/line-item-icons.svg#icon-autoguru-flat-tire-chopped", style: "icon-autoguru-flat-tire"}
      ]
    },

    dtpData: {
      phoneNumbers: [
        {link: "tel: {{18062822399}}", label: "Аварийные Комиссары"},
        {link: "tel: {{18062822399}}", label: "Эвакуатор/Буксировка"},
        {link: "tel: {{18062822399}}", label: "Полезная информация"}
      ]
    },

    sideMenuData: {
      links: [
        {link: "#/app/main-menu", label: "Главное меню"},
        {link: "#/app/city", label: "Выбор города"},
        {link: "#/app/agreement", label: "Пользовательское соглашение"}
      ]
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
      $localStorage.setObject('selectedCity', city);
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
      $localStorage.setObject('selectedDistrict', district);
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

  if ($localStorage.getObject('selectedCity')) {
    window.location.href = '#/app/main-menu';
  }

  $scope.checkConnection = function() {
    // states[Connection.UNKNOWN]  = 'Unknown connection';
    // states[Connection.ETHERNET] = 'Ethernet connection';
    // states[Connection.WIFI]     = 'WiFi connection';
    // states[Connection.CELL_2G]  = 'Cell 2G connection';
    // states[Connection.CELL_3G]  = 'Cell 3G connection';
    // states[Connection.CELL_4G]  = 'Cell 4G connection';
    // states[Connection.CELL]     = 'Cell generic connection';
    // states[Connection.NONE]     = 'No network connection';
    return navigator.connection.type;
  };

  $scope.zebraStripeLineItem = function(idx) {
    return idx % 2 ? 'zebra-stripe-light' : ''
  };
})
.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicSideMenuDelegate) {
  if ($scope.checkConnection() === 'none') {
    alert("Unable to get location, please check connection and try again.");
    return;
  }
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.$on('$locationChangeStart', function(event) {
    $ionicSideMenuDelegate.canDragContent(true);
  });

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    function initialize() {
      console.log("initialize map");
      var pos;
      var myLatlng;
      var initOptions = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(initOptions).then(function(pos) {
        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(myLatlng);
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
        console.log('Unable to get location: ' + error.message);
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
      console.log('Unable to get location: ' + error.message);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(map, 'dragstart', freezeMap);
    var updateOptions = {timeout: 3000, enableHighAccuracy: true};

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }
      isMapFrozen = false;
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      $cordovaGeolocation.getCurrentPosition(updateOptions).then(function(pos) {
        $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter($scope.myLatlng);
        console.log("loading location");
        $scope.marker.setMap(null);
        $scope.marker.setMap($scope.map);
        $scope.marker.setPosition($scope.myLatlng);
        $ionicLoading.hide();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
      });
    };

    $cordovaGeolocation.watchPosition(updateOptions).then(updateLoc, updateLocError);
  }

})
.controller('MainMenuCtrl', function($scope, $cordovaSocialSharing) {
   $scope.socialShare = function(options) {
     if ($scope.checkConnection() === 'none') {
       alert("Unable to get location, please check connection and try again.");
       return;
     }

     $cordovaSocialSharing.share("Checkout AutoGuru app", "AutoGuru App", "www/img/ionic.png", "http://auto-guru.net");
    };
});
