'use strict';

/**
 * @ngdoc overview
 * @name kotisivutApp
 * @description
 * # kotisivutApp
 *
 * Main module of the application.
 */
angular.module('kotisivutAppServices', []);

angular
  .module('kotisivutApp', [
    'kotisivutAppServices',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PageCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'PageCtrl'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl'
      })
      .when('/cv', {
        templateUrl: 'views/cv.html',
        controller: 'CVCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
