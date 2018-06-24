angular.module('myApp.weather-service', [])
    .factory('weatherService', ['$http', '$q', function ($http, $q) {
        this.bestWeather = {
            temp: 21,
            humidity: 50
        }
        var _this = this;
        this.isStopped = false;
        this.allWeather = new Array();
        this.weatherSorted = new Array();
       
        this.state = {
            status: "Loading",
            isInProgress: true
        };
        this.cities = [];
        this.rankWeather = function(data) {
            var tempGap = Math.abs(data.main.temp - _this.bestWeather.temp);
            var humidityGap = Math.abs(data.main.humidity - _this.bestWeather.humidity);
            data.rank = tempGap + humidityGap;
        }
        this.getWeatherCitiesInBox = function() {
            _this.state.status = "Loading";
            _this.isInProgress = true;
            service.stateChanged.emit(_this.state);
            $http.get("http://api.openweathermap.org/data/2.5/box/city?bbox=82.291113,-158.326064,21.819910,167.923936&appid=c613d0697fdf34499fe52d7efef6d90f&units=metric")
            .success(function (data, status, headers, config) {    
                _this.state.status = "Completed";   
                _this.state.isInProgress = false;    
                service.stateChanged.emit(_this.state);     
                _this.allWeather = data.list;
                _this.allWeather.forEach((el) => {
                    _this.rankWeather(el);
                })
                _this.sortWeather();
                service.weatherChanged.emit(_this.allWeather);
            })
            .error(function (data, status, headers, config) {
                console.error(data);

            });
        }
        
        this.sortWeather = function () {
            _this.weatherSorted = _this.allWeather.sort(function (a, b) { return a.rank - b.rank });
        };
        
        
        
        
        return service = {
           
            weatherChanged: new eventEmitter(),
            stateChanged: new eventEmitter(),
            loadWeatherList: function() {
                _this.getWeatherCitiesInBox();
            },
            
            setOptions: function (temprature, humidity) {
                var pausingNeeded = _this.state.isInProgress;
                if ((_this.bestWeather.temp != temprature) || (_this.bestWeather.humidity != humidity))
                {    
                   
                    _this.bestWeather = {
                        temp: temprature,
                        humidity: humidity
                    }
                    _this.allWeather.forEach(element => {
                        _this.rankWeather(element);
                    });
                    _this.sortWeather();
                    service.weatherChanged.emit(_this.allWeather);
                }
                    


            },
        }
        _this.getWeatherCitiesInBox();
    }]);