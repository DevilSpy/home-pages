'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kotisivutApp
 */

var myModule = angular.module('kotisivutApp');

myModule.factory('ContentFactory', function($http) {
	return $http.get('scripts/content.json');
})

myModule.controller('PortfolioCtrl', function ($scope, $cookieStore, $cookies, ContentFactory) {
	ContentFactory.success(function(data) {
			
		var language;

		if ($cookieStore.get('language') != null) {
			language = $cookieStore.get('language');
		} else {
			language = "en";
			$cookieStore.put('language', language);
		}

		var portfolio = data.content.portfolio;

		var training_tracker = portfolio.training_tracker;
		if (language == "fi") {
			$scope.training_tracker = training_tracker.fi;
		} else {
			$scope.training_tracker = training_tracker.en;
		}

		var training_tracker_javaee = portfolio.training_tracker_javaee;
		if (language == "fi") {
			$scope.training_tracker_javaee = training_tracker_javaee.fi;
		} else {
			$scope.training_tracker_javaee = training_tracker_javaee.en;
		}

		var threejs_demo = portfolio.threejs_demo;
		if (language == "fi") {
			$scope.threejs_demo = threejs_demo.fi;
		} else {
			$scope.threejs_demo = threejs_demo.en;
		}
	});	  
});

 

