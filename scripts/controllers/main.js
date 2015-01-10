'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kotisivutApp
 */
angular.module('kotisivutApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

var myModule = angular.module('kotisivutApp');

myModule.factory('ContentFactory', function($http) {
	return $http.get('scripts/content.json');
})

myModule.controller('PageCtrl', function($scope, $timeout, $location, $cookieStore, $cookies, ContentFactory) {

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


	//$timeout(function() {
		ContentFactory.success(function(data) {
			
			// NAVBAR
			//var frontpage, portfolio, cv, contact;
			var navbar = data.content.navbar;
			if (language == "fi") {
				$scope.frontpage = navbar.frontpage.fi;
				$scope.portfolio = navbar.portfolio.fi;
				$scope.cv = navbar.cv.fi;
				$scope.contact = navbar.contact.fi;
			} else {
				$scope.frontpage = navbar.frontpage.en;
				$scope.portfolio = navbar.portfolio.en;
				$scope.cv = navbar.cv.en;
				$scope.contact = navbar.contact.en;
			}

			// CONTENT
			//var introduction_text, profession_text, hobbies_text;
			var introduction = data.content.introduction;
			if (language == "fi") {
				$scope.introduction_text = introduction.fi;
			} else {
				$scope.introduction_text = introduction.en
			}

			var profession = data.content.profession;
			if (language == "fi"){
				$scope.profession_text = profession.fi;
			} else {
				$scope.profession_text = profession.en;
			}

			var hobbies = data.content.hobbies;
			if (language == "fi") {
				$scope.hobbies_text = hobbies.fi;
			} else {
				$scope.hobbies_text = hobbies.en;
			}
		});
	//}, 500);

		// Get Active class for navigation links
		$scope.getClass = function(path) {
			if ($location.path().substr(0, path.length) == path) {
				return "active";
			} else {
				return "";
			}
		}
})