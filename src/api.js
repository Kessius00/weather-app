// importing images
import cloudIncoming from './img/cloudincoming.webp';
import thunder from './img/thunder.webp';
import sunnyClouds from './img/sunnyclouds.webp';
import clouds from './img/clouds.webp';

async function getWeatherData(city) {
    const apiKey = 'UGARQTPJ3DS9DB2A8VW2L5JH7';
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;
    if (!city) {
        throw new Error('City name is required');
    }
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

class weatherInfo {
    constructor(city) {
        this.city = city;
    }

    async getWeather() {
        const data = await getWeatherData(this.city);
        this.cityName = data.address;
        this.currentConditions = data.currentConditions;

        // more specific data
        this.tempF = data.currentConditions.temp;
        this.tempC = (data.currentConditions.temp - 32) * (5 / 9);
        this.feelsLikeF = data.currentConditions.feelslike;
        this.feelsLikeC = (data.currentConditions.feelslike - 32) * (5 / 9);
        this.uvIndex = data.currentConditions.uvindex;

        this.humidity = data.currentConditions.humidity;
        this.windSpeedMPH = data.currentConditions.windspeed;
        this.windSpeedKPH = data.currentConditions.windspeed * 1.609344; // Convert mph to kph

        this.atTime = data.currentConditions.datetime;
        this.icon = data.currentConditions.icon;
        return data;
    }
}

const weather = new weatherInfo('New Jersey');
weather
    .getWeather()
    .then((data) => {
        console.log('Weather data:', weather.tempC);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

export { getWeatherData };

searchGiphy('cat');
button.addEventListener('click', function () {
    const searchTerm = input.value;
    searchGiphy(searchTerm);
    input.value = '';
});

const img = document.querySelector('.giphy-img');
const input = document.querySelector('input');
const button = document.querySelector('button');

async function searchGiphy(searchTerm) {
    try {
        if (!searchTerm) {
            alert('Please enter a search term');
            searchTerm = 'clouds'; // Default search term if none provided
        }
        const apiKey = 'GGZrGXwqmcr4R1vjq15pkUEGaTdrOHlT';

        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchTerm}`,
            { mode: 'cors' }
        );

        if (!response.ok) {
            throw new Error(
                'Network response was not ok ' + response.statusText
            );
        }

        const giphyData = await response.json();
        img.src = giphyData.data.images.original.url;
        img.alt = searchTerm || 'Giphy image';
    } catch (error) {
        console.log('Error:', error);
    }
}
