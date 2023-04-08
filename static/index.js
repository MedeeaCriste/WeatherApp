const main = document.querySelector('main');
const search = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.error');
const body = document.querySelector('body');


search.addEventListener('click', () => {

    const APIKey = '4ce1c55e7ecb05435e63ec63b3ae9957';
    const city = document.querySelector('.search-bar input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                main.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './static/images/clear.png';
                    body.style.backgroundImage = 'url("./static/images/clearbackimg.jpeg")';

                    break;

                case 'Rain':
                    image.src = './static/images/rain.png';
                    body.style.backgroundImage = 'url("./static/images/rainbackimg.jpg")'

                    break;

                case 'Snow':
                    image.src = './static/images/snow.png';
                    body.style.backgroundImage = 'url("./static/images/sanowbackimg.jpg")'
                    break;

                case 'Clouds':
                    image.src = './static/images/cloud.png';
                    body.style.backgroundImage = 'url("./static/images/cloudbackimg.jpg")'
                    break;

                case 'Haze':
                    image.src = './static/images/mist.png';
                    body.style.backgroundImage = 'url("./static/images/hazebackimg.jpg")'
                    break;

                default: 
                    image.src = '';
            }

            

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            main.style.height = '590px';


        });


});