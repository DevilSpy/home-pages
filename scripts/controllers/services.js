var services = angular.module('kotisivutAppServices');

services.factory('ContentFactory', function($http) {
	return $http.get('scripts/content.json');
});

services.factory('LanguageFactory', function($cookieStore, $cookies){
	var language;

	if ($cookieStore.get('language') != null) {
		language = $cookieStore.get('language');
	} else {
		language = "en";
		$cookieStore.put('language', language);
	}

	return language;
});

