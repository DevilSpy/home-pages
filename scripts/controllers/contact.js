'use strict';

/**
 * @ngdoc function
 * @name kotisivutApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kotisivutApp
 */
var myModule = angular.module('kotisivutApp');

myModule.controller('ContactCtrl', function ($scope, $cookieStore, $cookies, ContentFactory, LanguageFactory) {

	var language = LanguageFactory;

	ContentFactory.success(function(data) {

		var contact = data.content.contact;

		var contact_title = contact.contact_title;
		var contact_text = contact.contact_text;
		var linkedin = contact.linkedin;
		var github = contact.github;

		var choices = {1: contact_title, 2: contact_text, 3: linkedin, 4: github};

		var determineLanguage = function (choice) {
			if (language == "fi") {
				return choices[choice].fi
			} else {
				return choices[choice].en;

			}
		}

		$scope.contact_title = determineLanguage(1);
		$scope.contact_text = determineLanguage(2);
		$scope.linkedin = determineLanguage(3);
		$scope.github = determineLanguage(4);		
	});
});
