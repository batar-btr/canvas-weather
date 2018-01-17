'use strict';

(function () {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;

    var pathOpts = {
        cityId: 706483,
        key: 'dd3a270b23d98cf77f4b36c4d4e8ab8c',
        units: 'metric'
    };

    var wOpts = {
        currentTemp: undefined,
        maxTemp: undefined,
        minTemp: undefined,
        cloudiness: undefined
    };
    var checkResponse = function checkResponse(response) {
        console.log(response.status);
        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
            return response.json();
        }
        throw new Error('Ooops - shit happen`s');
    };

    var initialOpts = function initialOpts(data) {
        wOpts.currentTemp = data.main.temp;
        wOpts.maxTemp = data.main.temp_max;
        wOpts.minTemp = data.main.temp_min;
        wOpts.cloudiness = data.clouds.all;
        console.log(wOpts);
    };

    var getWeather = function getWeather() {

        fetch('http://api.openweathermap.org/data/2.5/weather?id=' + pathOpts.cityId + '&units=' + pathOpts.units + '&APPID=' + pathOpts.key).then(checkResponse).then(initialOpts).catch(function (error) {
            return console.log(error);
        });
    };

    getWeather();
})();