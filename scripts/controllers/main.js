'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kotisivutApp
 */

var myModule = angular.module('kotisivutApp');

myModule.factory('ContentFactory', function($http) {
	return $http.get('scripts/content.json');
})

myModule.controller('PageCtrl', function($scope, $location, $cookieStore, $cookies, ContentFactory) {

	var language;

	if ($cookieStore.get('language') != null) {
		language = $cookieStore.get('language');
	} else {
		language = "en";
		$cookieStore.put('language', language);
	}

	$scope.setLanguage = function(lang) {
		$cookieStore.put('language', lang);
		language = $cookieStore.get('language');
	}

	$scope.setActive = function(lang) {
		if ($cookieStore.get('language') == lang) {
			return "active";
		} else {
			return "";
		}
	}


	
		ContentFactory.success(function(data) {
			
			var navbar = data.content.navbar;
			var introduction = data.content.introduction;
			var profession = data.content.profession;
			var hobbies = data.content.hobbies;

			var frontpage = navbar.frontpage;
			var portfolio = navbar.portfolio;
			var cv = navbar.cv;
			var contact = navbar.contact;	

			var choices = {1: frontpage, 2: portfolio, 3: cv, 4: contact, 5: introduction, 6: profession, 7: hobbies};

			var determineLanguage = function (choice) {
				if (language == "fi") {
					return choices[choice].fi
				} else {
					return choices[choice].en;
				}
			}

			$scope.frontpage = determineLanguage(1);
			$scope.portfolio = determineLanguage(2);
			$scope.cv = determineLanguage(3);
			$scope.contact = determineLanguage(4);
			$scope.introduction_text = determineLanguage(5);
			$scope.profession_text = determineLanguage(6);
			$scope.hobbies_text = determineLanguage(7);

		});

		

		// Get Active class for navigation links
		$scope.getClass = function(path) {
			if ($location.path().substr(0, path.length) == path) {
				return "active";
			} else {
				return "";
			}
		}
})