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


myModule.controller('CVCtrl', function ($scope, $cookieStore, $cookies, ContentFactory) {
	ContentFactory.success(function(data) {
			
		var language;

		if ($cookieStore.get('language') != null) {
			language = $cookieStore.get('language');
		} else {
			language = "en";
			$cookieStore.put('language', language);
		}

		var cv = data.content.cv;

		var current_projects = cv.current_projects;
		var data_visualization = cv.data_visualization;
		var data_visualization_text = cv.data_visualization_text;
		var game_programming = cv.game_programming;
		var game_programming_text = cv.game_programming_text;
		var past_experience = cv.past_experience;
		var n4s = cv.n4s;
		var n4s_time = cv.n4s_time;
		var n4s_text = cv.n4s_text;
		var other_works = cv.other_works;
		var other_works_text = cv.other_works_text;
		var activities = cv.activities;
		var haedongkumdo = cv.haedongkumdo;
		var haedongkumdo_time = cv.haedongkumdo_time;
		var hanmoodo = cv.hanmoodo;
		var hanmoodo_time = cv.hanmoodo_time;

		var choices = {1: current_projects, 2: data_visualization, 3: data_visualization_text,
		 				4: game_programming, 5: game_programming_text, 6: past_experience,
		 				 7: n4s, 8: n4s_time, 9: n4s_text, 10: other_works, 11: other_works_text,
		 				 12: activities, 13: haedongkumdo, 14: haedongkumdo_time, 15: hanmoodo,
		 				 16: hanmoodo_time};

		var determineLanguage = function (choice) {
			if (language == "fi") {
				return choices[choice].fi
			} else {
				return choices[choice].en;

			}
		}

		$scope.current_projects = determineLanguage(1);
		$scope.data_visualization = determineLanguage(2);
		$scope.data_visualization_text = determineLanguage(3);
		$scope.game_programming = determineLanguage(4);
		$scope.game_programming_text = determineLanguage(5);
		$scope.past_experience = determineLanguage(6);
		$scope.n4s = determineLanguage(7);
		$scope.n4s_time = determineLanguage(8);
		$scope.n4s_text = determineLanguage(9);
		$scope.other_works = determineLanguage(10);
		$scope.other_works_text = determineLanguage(11);
		$scope.activities = determineLanguage(12);
		$scope.haedongkumdo = determineLanguage(13);
		$scope.haedongkumdo_time = determineLanguage(14);
		$scope.hanmoodo = determineLanguage(15);
		$scope.hanmoodo_time = determineLanguage(16);
	});
});