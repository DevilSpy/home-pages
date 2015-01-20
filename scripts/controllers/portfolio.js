'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kotisivutApp
 */

var myModule = angular.module('kotisivutApp');

myModule.controller('PortfolioCtrl', function ($scope, $cookieStore, $cookies, ContentFactory, LanguageFactory) {
	
	var language = LanguageFactory;
	
	ContentFactory.success(function(data) {

		var portfolio = data.content.portfolio;
		
		var training_tracker = portfolio.training_tracker;
		var training_tracker_javaee = portfolio.training_tracker_javaee;
		var threejs_demo = portfolio.threejs_demo;
		var hasuniityn_hunaja = portfolio.hasuniityn_hunaja;
		var unity_case = portfolio.unity_case;
		var D_models = portfolio.D_models;
		var D_models_title = portfolio.D_models_title;
		var graphics = portfolio.graphics;
		var graphics_title = portfolio.graphics_title;
		var unity_case_title = portfolio.unity_case_title;
		
		var choices = {1: training_tracker, 2: training_tracker_javaee, 3: threejs_demo, 4: hasuniityn_hunaja, 5: unity_case, 
						6: D_models, 7: D_models_title, 8: graphics, 9: graphics_title, 10: unity_case_title};
		
		var determineLanguage = function (choice) {
			if (language == "fi") {
				return choices[choice].fi
			} else {
				return choices[choice].en;

			}
		}

		$scope.training_tracker = determineLanguage(1);
		$scope.training_tracker_javaee = determineLanguage(2);
		$scope.threejs_demo = determineLanguage(3);
		$scope.hasuniityn_hunaja = determineLanguage(4);
		$scope.unity_case = determineLanguage(5);
		$scope.D_models = determineLanguage(6);
		$scope.D_models_title = determineLanguage(7);
		$scope.graphics = determineLanguage(8);
		$scope.graphics_title = determineLanguage(9);
		$scope.unity_case_title = determineLanguage(10);

 	});	  
});

 

