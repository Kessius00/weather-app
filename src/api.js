// importing images
import cloudIncoming from './img/cloudincoming.webp';
import thunder from './img/thunder.webp';
import sunnyClouds from './img/sunnyclouds.webp';
import clouds from './img/clouds.webp';

import { toggleTemperatureUnit } from './eventListeners.js';

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

function capitalizeEachWord(string) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string
        .split(' ')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ');
}

class weatherInfo {
    constructor(city) {
        this.city = city;
    }

    async getWeather() {
        const data = await getWeatherData(this.city);
        this.cityName = capitalizeEachWord(data.address);
        this.currentConditions = data.currentConditions;

        console.log('DATA: ', data);

        // more specific data
        this.tempF = data.currentConditions.temp;
        this.tempC = ((data.currentConditions.temp - 32) * (5 / 9)).toFixed(1); // Convert Fahrenheit to Celsius
        this.feelsLikeF = data.currentConditions.feelslike;
        this.feelsLikeC = (
            (data.currentConditions.feelslike - 32) *
            (5 / 9)
        ).toFixed(1); // Convert Fahrenheit to Celsius
        this.uvIndex = data.currentConditions.uvindex;

        this.humidity = data.currentConditions.humidity;
        this.windSpeedMPH = data.currentConditions.windspeed;
        this.windSpeedKPH = (
            data.currentConditions.windspeed * 1.609344
        ).toFixed(1); // Convert mph to kph

        this.atTime = data.currentConditions.datetime;
        this.condition = data.currentConditions.conditions;
        return data;
    }
}

const weather = new weatherInfo('New jersey');
weather
    .getWeather()
    .then((data) => {
        consoleData(); // Log the weather data to the console
        // Update the UI with weather data
        const cityElement = document.querySelector('.location');
        const condition = document.querySelector('.condition');

        cityElement.textContent = weather.cityName;
        condition.textContent = weather.condition;

        const tempElement = document.querySelector('.temperature');
        const feelsLikeElement = document.querySelector('.feels-like-edit');
        const windSpeedElement = document.querySelector('.wind-edit');

        const informationPanel = document.querySelector('.left-right');
        informationPanel.addEventListener('click', () => {
            toggleTemperatureUnit(weather);
        });

        if (informationPanel.classList.contains('celsius')) {
            tempElement.textContent = weather.tempC;
            feelsLikeElement.textContent = weather.feelsLikeC;
            windSpeedElement.textContent = weather.windSpeedKPH;
        } else {
            tempElement.textContent = weather.tempF;
            feelsLikeElement.textContent = weather.feelsLikeF;
            windSpeedElement.textContent = weather.windSpeedMPH;
        }

        const humidityElement = document.querySelector('.humidity-edit');
        const uvIndexElement = document.querySelector('.uv-index-edit');
        humidityElement.textContent = weather.humidity;
        uvIndexElement.textContent = weather.uvIndex;

        searchGiphy(weather.condition);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

export { getWeatherData };

async function searchGiphy(searchTerm) {
    try {
        const img = document.querySelector('.giphy-img');
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

function consoleData() {
    console.log('Weather data:', weather);
}
