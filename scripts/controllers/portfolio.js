'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kotisivutApp
 */
angular.module('kotisivutApp')
  .controller('PortfolioCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
