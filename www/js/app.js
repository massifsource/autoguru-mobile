// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('AutoGuru', ['ionic', 'AutoGuru.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
    }
)
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html"
        }
      }
    })

  .state('app.road-help-main', {
    url: "/road-help",
    views: {
      'menuContent': {
        templateUrl: "templates/road-help/index.html"
      }
    }
  }).state('app.road-help-flat-tire', {
        url: "/road-help/flat-tire",
        views: {
          'menuContent': {
            templateUrl: "templates/road-help/flat-tire.html"
          }
        }
      })
      .state('app.dtp-main', {
        url: "/dtp",
        views: {
          'menuContent': {
            templateUrl: "templates/dtp/index.html"
          }
        }
      })
      .state('app.dtp-komissar', {
        url: "/dtp/komissar",
        views: {
          'menuContent': {
            templateUrl: "templates/dtp/komissar.html"
          }
        }
      })
      .state('app.auto-info-main', {
        url: "/auto-info",
        views: {
          'menuContent': {
            templateUrl: "templates/auto-info/index.html"
          }
        }
      })
      .state('app.auto-info-service', {
        url: "/auto-info/service",
        views: {
          'menuContent': {
            templateUrl: "templates/auto-info/service.html"
          }
        }
      })
      .state('app.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "templates/profile.html"
          }
        }
      })
      .state('app.share', {
        url: "/share",
        views: {
          'menuContent': {
            templateUrl: "templates/share.html"
          }
        }
      })
      .state('app.settings', {
        url: "/settings",
        views: {
          'menuContent': {
            templateUrl: "templates/settings.html"
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
      .state('app.contact-us', {
        url: "/contact-us",
        views: {
          'menuContent': {
            templateUrl: "templates/contact-us.html"
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
      })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
