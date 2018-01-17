(() => {
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const pathOpts = {
        cityId: 706483,
        key: 'dd3a270b23d98cf77f4b36c4d4e8ab8c',
        units: 'metric'
    };

    const wOpts = {
        currentTemp: undefined,
        maxTemp: undefined,
        minTemp: undefined,
        cloudiness: undefined
    };
    let checkResponse = response => {
        console.log(response.status);
        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
            return response.json();
        }
        throw new Error('Ooops - shit happen`s');
    };

    let initialOpts = data => {
        wOpts.currentTemp = data.main.temp;
        wOpts.maxTemp = data.main.temp_max;
        wOpts.minTemp = data.main.temp_min;
        wOpts.cloudiness = data.clouds.all;
        console.log(wOpts);
    };

    let getWeather = () => {

        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${pathOpts.cityId}&units=${pathOpts.units}&APPID=${pathOpts.key}`)
            .then(checkResponse)
            .then(initialOpts)
            .catch(error => console.log(error));

    };

    getWeather();





})();