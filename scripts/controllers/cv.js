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
});


myModule.controller('CVCtrl', function ($scope, $cookieStore, $cookies, ContentFactory) {
	
	var language;

	if ($cookieStore.get('language') != null) {
		language = $cookieStore.get('language');
	} else {
		language = "en";
		$cookieStore.put('language', language);
	}

	ContentFactory.success(function(data) {
			

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
		var skills = cv.skills;

		var choices = {1: current_projects, 2: data_visualization, 3: data_visualization_text,
		 				4: game_programming, 5: game_programming_text, 6: past_experience,
		 				 7: n4s, 8: n4s_time, 9: n4s_text, 10: other_works, 11: other_works_text,
		 				 12: activities, 13: haedongkumdo, 14: haedongkumdo_time, 15: hanmoodo,
		 				 16: hanmoodo_time, 17: skills};

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
		$scope.skills = determineLanguage(17);
	});
	
	// PROGRAMMING LANGUAGES CHART
	$(function () {

	var programming_text;
	if(language == "fi") {
		programming_text = "Ohjelmointikielet";
	} else {
		programming_text = "Programming languages";
	}

    var colors = Highcharts.getOptions().colors,
        categories = ['PHP', 'JavaScript', 'Java', 'JavaEE', 'C#'],
        data = [{
            y: 30,
            color: colors[0],
            drilldown: {      
            	name: 'Versions',
                categories: ['PHP 5'],
                data: [30],
                color: colors[1]
            }
        }, {
            y: 30,
            color: colors[1],
            drilldown: {
                name: 'Frameworks',
                categories: ['AngularJS', 'jQuery', 'Three.js', 'Highcharts'],
                data: [12, 12, 3, 3],
                color: colors[1]
            }
        }, {
            y: 25,
            color: colors[2],
            drilldown: {
                name: 'Versions',
                categories: ['Java 7'],
                data: [25],
                color: colors[2]
            }
        }, {
            y: 10,
            color: colors[3],
            drilldown: {
                name: 'Frameworks',
                categories: ['Spring', 'JSF'],
                data: [7, 3],
                color: colors[3]
            }
        }, {
            y: 5,
            color: colors[4],
            drilldown: {
                name: 'Versions',
                categories: ['C#'],
                data: [5],
                color: colors[4]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


	    // Build the data arrays
	    for (i = 0; i < dataLen; i += 1) {

	        // add browser data
	        browserData.push({
	            name: categories[i],
	            y: data[i].y,
	            color: data[i].color
	        });

	        // add version data
	        drillDataLen = data[i].drilldown.data.length;
	        for (j = 0; j < drillDataLen; j += 1) {
	            brightness = 0.2 - (j / drillDataLen) / 5;
	            versionsData.push({
	                name: data[i].drilldown.categories[j],
	                y: data[i].drilldown.data[j],
	                color: Highcharts.Color(data[i].color).brighten(brightness).get()
	            });
	        }
	    }

	    // Create the chart
	    $('#programming_languages').highcharts({
	        chart: {
	            type: 'pie'
	        },
	        title: {
	            text: programming_text
	        },
	        yAxis: {
	            title: {
	                text: ''
	            }
	        },
	        plotOptions: {
	            pie: {
	                shadow: false,
	                center: ['50%', '50%']
	            }
	        },
	        tooltip: {
	            valueSuffix: '%',
	            enabled: false
	        },
	        series: [{
	            name: 'Language',
	            data: browserData,
	            size: '60%',
	            dataLabels: {
	                formatter: function () {
	                    return this.y > 5 ? this.point.name : null;
	                },
	                color: 'white',
	                distance: -30
	            }
	        }, {
	            name: 'Versions',
	            data: versionsData,
	            size: '80%',
	            innerSize: '60%',
	            dataLabels: {
	                formatter: function () {
	                    // display only if larger than 1
	                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
	                }
	            }
	        }]
	    });
	});


	
	// WEB CHART
	$(function () {
		var web_text;
		if(language == "fi") {
			web_text = "Web-teknologiat"
		} else {
			web_text = "Web technologies"
		}
	    $('#webchart').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: web_text
	        },
	        tooltip: {
	            pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} %',
	            enabled: false
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Technology',
	            shadow: false,
	            data: [
	                ['HTML', 40],
	                ['CSS', 20],
	                ['XML', 20],
	                ['JSON', 20]
	            ]
	        }]
	    });
	});

	// PROGRAMS CHART
	$(function () {

	var programs_text;
	if(language == "fi") {
		programs_text = "Ohjelmat";
	} else {
		programs_text = "Programs";
	}

    var colors = Highcharts.getOptions().colors,
        categories = ['Adobe CS6', 'Microsoft Office', 'Programming', 'Other'],
        data = [{
            y: 30,
            color: colors[0],
            drilldown: {      
            	name: 'Versions',
                categories: ['Photoshop', 'Illustrator', 'Premiere', 'After Effects', 'Audition', 'Dreamweaver'],
                data: [8, 4, 7, 5, 2, 4],
                color: colors[1]
            }
        }, {
            y: 30,
            color: colors[1],
            drilldown: {
                name: 'Frameworks',
                categories: ['Word', 'Excel', 'Powerpoint'],
                data: [10, 10, 10],
                color: colors[1]
            }
        }, {
            y: 30,
            color: colors[2],
            drilldown: {
                name: 'Versions',
                categories: ['SublimeText', 'Netbeans', 'Eclipse', 'Visual Studio'],
                data: [10, 10, 5, 5],
                color: colors[2]
            }
        }, {
            y: 10,
            color: colors[3],
            drilldown: {
                name: 'Frameworks',
                categories: ['3dsMax', 'Unity'],
                data: [5, 5],
                color: colors[3]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


	    // Build the data arrays
	    for (i = 0; i < dataLen; i += 1) {

	        // add browser data
	        browserData.push({
	            name: categories[i],
	            y: data[i].y,
	            color: data[i].color
	        });

	        // add version data
	        drillDataLen = data[i].drilldown.data.length;
	        for (j = 0; j < drillDataLen; j += 1) {
	            brightness = 0.2 - (j / drillDataLen) / 5;
	            versionsData.push({
	                name: data[i].drilldown.categories[j],
	                y: data[i].drilldown.data[j],
	                color: Highcharts.Color(data[i].color).brighten(brightness).get()
	            });
	        }
	    }

	    // Create the chart
	    $('#programs').highcharts({
	        chart: {
	            type: 'pie'
	        },
	        title: {
	            text: programs_text
	        },
	        yAxis: {
	            title: {
	                text: ''
	            }
	        },
	        plotOptions: {
	            pie: {
	                shadow: false,
	                center: ['50%', '50%']
	            }
	        },
	        tooltip: {
	            valueSuffix: '%',
	            enabled: false
	        },
	        series: [{
	            name: 'Language',
	            data: browserData,
	            size: '60%',
	            dataLabels: {
	                formatter: function () {
	                    return this.y > 5 ? this.point.name : null;
	                },
	                color: 'white',
	                distance: -30
	            }
	        }, {
	            name: 'Versions',
	            data: versionsData,
	            size: '80%',
	            innerSize: '60%',
	            dataLabels: {
	                formatter: function () {
	                    // display only if larger than 1
	                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
	                }
	            }
	        }]
	    });
	});

	// APIS CHART
	$(function () {
		var apis_text;
		if(language == "fi") {
			apis_text = "API:t"
		} else {
			apis_text = "APIs"
		}
	    $('#apis').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: apis_text
	        },
	        tooltip: {
	            pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} %',
	            enabled: false
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Technology',
	            shadow: false,
	            data: [
	                ['Google Maps API', 50],
	                ['REST', 50]
	            ]
	        }]
	    });
	});
});