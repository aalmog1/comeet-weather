'use strict';

angular.module('myApp.weather.weather-detail',[])
    .directive('weatherDetail', function () {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                weather: '=',
                selected: '&'
            },
         
            templateUrl: 'components/weather/weather-detail.html',
            controller: function($scope) {
				
                $scope.select = function() {
                    $scope.selected($scope.weather);
                };
            },
            link: function ($scope, element, attrs) { 
			
			} //DOM manipulation
        }
    });