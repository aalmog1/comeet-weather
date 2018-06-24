'use strict';

angular.module('myApp.weatherView', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/weatherView', {
      templateUrl: 'weatherView/weatherView.html',
      controller: 'weatherViewCtrl'
    });
  }])

  .controller('weatherViewCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
    $scope.state = {};
    $scope.options = [
      { display: 'male', humidity: 50, temp: 21, selected: true },
      { display: 'female', humidity: 50, temp: 22, selected: false }
    ];


    $scope.maxToShow = 10;
    $scope.weatherList = new Array();
    $scope.onSelect = function (id) {
      alert('view1 alert: ' + id);

    };
    var toggleLoading = false;
    $scope.selectOption = function (option) {
      $scope.options.forEach(element => {
        element.selected = false;
      });
      option.selected = true;
      weatherService.setOptions(option.humidity, option.temp);
    };
    $scope.reloadWeather = function () {
      weatherService.loadWeatherList();
    }
    
    weatherService.stateChanged.subscribe((state) => {
      $scope.state = state;
    });

    weatherService.weatherChanged.subscribe((data) => {
      $scope.weatherList = data;
    });

    weatherService.setOptions(21, 50);
    weatherService.loadWeatherList();

  }]);