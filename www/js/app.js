// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('AutoGuru', ['ionic', 'AutoGuru.controllers', 'ngCordova', 'ngIOS9UIWebViewPatch'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // screen.lockOrientation('portrait');
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  $ionicConfigProvider.views.swipeBackEnabled(false);
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.main-menu', {
    url: "/main-menu",
    views: {
      'menuContent': {
        templateUrl: "templates/main-menu.html",
        controller: 'MainMenuCtrl'
      }
    }
  })
  .state('app.city', {
    url: "/city",
    views: {
      'menuContent': {
        templateUrl: "templates/city.html"
      }
    }
  })
  .state('app.district', {
    url: "/district",
    views: {
      'menuContent': {
        templateUrl: "templates/district.html"
      }
    }
  })
  .state('app.taxi', {
    url: "/taxi",
    views: {
      'menuContent': {
        templateUrl: "templates/taxi.html"
      }
    }
  })
  .state('app.maps', {
    url: "/maps",
    views: {
      'menuContent': {
        templateUrl: "templates/maps.html",
        controller: 'MapCtrl'
      }
    }
  })
  .state('app.road-help', {
    url: "/road-help",
    views: {
      'menuContent': {
        templateUrl: "templates/road-help.html"
      }
    }
  })
  .state('app.dtp', {
    url: "/dtp",
    views: {
      'menuContent': {
        templateUrl: "templates/dtp.html"
      }
    }
  })
  .state('app.feedback', {
    url: "/feedback",
    views: {
      'menuContent': {
        templateUrl: "templates/feedback.html"
      }
    }
  })
  .state('app.agreement', {
    url: "/agreement",
    views: {
      'menuContent': {
        templateUrl: "templates/agreement.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/city');
})
.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
