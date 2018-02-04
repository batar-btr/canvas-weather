'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        cityName: undefined,
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

    // let getWeather = () => {

    //     fetch(`http://api.openweathermap.org/data/2.5/weather?id=${pathOpts.cityId}&units=${pathOpts.units}&APPID=${pathOpts.key}`)
    //         .then(checkResponse)
    //         .then(initialOpts)
    //         .catch(error => console.log(error));

    // };

    // getWeather();

    var Diagram = function () {
        function Diagram(x, y, number, name, color) {
            _classCallCheck(this, Diagram);

            this.x = x;
            this.y = y;
            this.amount = number;
            this.number = Math.PI * 2 * Number('0.' + number);
            this.name = name;
            this.radians = 0;
            this.color = color;
            this.speed = 0.08;
        }

        _createClass(Diagram, [{
            key: 'draw',
            value: function draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 100, 0, Math.PI * 2, false);
                ctx.strokeStyle = 'rgba(52, 52, 54, 1)';
                ctx.lineWidth = 20;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(this.x, this.y, 100, 0, this.radians, false);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 20;
                ctx.stroke();
                ctx.closePath();
                ctx.font = 70 + 'px \'Poiret One\', cursive';
                ctx.fillStyle = '#ebebeb';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.amount, this.x, this.y);
                ctx.fillText(this.name, this.x, this.y - 150);
            }
        }, {
            key: 'update',
            value: function update() {
                if (preloader.status) {
                    this.update = function () {
                        this.speed > 0.001 ? this.speed -= 0.0005 : false;
                        this.radians < this.number ? this.radians += this.speed : false;
                        this.draw();
                    };
                }
            }
        }]);

        return Diagram;
    }();

    ;

    var testingPromise = new Promise(function (res, rej) {
        setTimeout(function () {
            res(true);
        }, 5000);
    });

    testingPromise.then(function (res) {
        preloader.status = res;
        console.log(preloader.status);
        _animate.status = true;
    });

    var preloader = {
        status: false,
        opacity: 1,
        bgc: 'rgba(29, 31, 32, opacity)',
        circleColor: 'rgba(52, 52, 54, opacity)',
        dotColor: 'rgba(14, 190, 255, opacity)',
        x: w / 2,
        y: h / 2,
        radius: w > h ? h / 4 : w / 4,
        radians: 0,
        speed: 0.02,
        fontSize: w > h ? h / 5 : w / 5,
        draw: function draw() {
            ctx.fillStyle = this.bgc.replace('opacity', this.opacity);
            ctx.fillRect(0, 0, w, h);
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = this.circleColor.replace('opacity', this.opacity);
            ctx.lineWidth = Math.floor(w > h ? h / 100 : w / 100);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
            ctx.fillStyle = this.dotColor.replace('opacity', this.opacity);
            ctx.fill();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.radians * 4);
            ctx.arc(30, 0, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            // ctx.moveTo(0, 0);
            // ctx.lineTo(30, 0);
            // ctx.stroke();
            ctx.closePath();
            ctx.restore();
            ctx.font = this.fontSize + 'px Arial';
            ctx.fillStyle = this.circleColor.replace('opacity', this.opacity);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText('btrn', w / 2, h / 2);
        },
        update: function update() {
            if (this.status) {
                this.opacity > 0 ? this.opacity -= 0.01 : this.opacity = 0;
            }

            if (this.opacity != 0) {
                this.radians += this.speed;
                // this.gravity > 10 ? this.gravity -=0.2 : false;
                this.radians > Math.PI * 2 ? this.radians -= Math.PI * 2 : false;
                this.x = w / 2 + Math.cos(this.radians) * this.radius;
                this.y = h / 2 + Math.sin(this.radians) * this.radius;
                this.draw();
            }
        }
    };

    var header = {
        height: w > h ? h / 6 : h / 8,
        width: w,
        bgc: 'gray',
        cityName: wOpts.cityName || 'Kharkiv',
        textColor: '#ebebeb',
        draw: function draw() {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, this.width, this.height);
            ctx.font = Math.floor(this.height * 0.8) + 'px \'Poiret One\', cursive';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.cityName, w / 2, this.height / 2);
        }
    };

    var diagrams = {
        width: w,
        height: w > h ? w / 4 : h / 4,
        bgc: 'white',
        x: 0,
        y: header.height,
        cloudiness: new Diagram(w * 0.25, (w > h ? w / 4 : h / 4) / 2, 73, 'cloud', 'yellow'),
        humidity: new Diagram(w * 0.75, (w > h ? w / 4 : h / 4) / 2, 86, 'humidity', 'rgba(14, 190, 255, 1)'),
        draw: function draw() {
            ctx.save();
            ctx.translate(0, header.height);
            ctx.strokeStyle = this.bgc;
            ctx.strokeRect(0, 0, this.width, this.height);
            this.cloudiness.update();
            this.humidity.update();
            ctx.restore();
        }
    };

    function _animate() {
        ctx.fillStyle = 'rgb(29, 31, 32)';
        ctx.fillRect(0, 0, w, h);
        preloader.update();
        if (_animate.status) {
            _animate = function animate() {
                ctx.fillStyle = 'rgb(29, 31, 32)';
                ctx.fillRect(0, 0, w, h);
                header.draw();
                diagrams.draw();
                preloader.update();
                window.requestAnimationFrame(_animate);
            };
            console.log(_animate);
        }

        window.requestAnimationFrame(_animate);
    }

    _animate();
    console.log(_animate);
})();