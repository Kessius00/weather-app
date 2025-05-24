import { safeChangeCity } from './api';

export function toggleTemperatureUnit(weather) {
    const informationPanel = document.querySelector('.left-right');
    const tempElement = document.querySelector('.temperature');
    const feelsLikeElement = document.querySelector('.feels-like-edit');
    const windSpeedElement = document.querySelector('.wind-edit');

    if (informationPanel.classList.contains('celsius')) {
        tempElement.textContent = weather.tempF;
        feelsLikeElement.textContent = weather.feelsLikeF;
        windSpeedElement.textContent = weather.windSpeedMPH;
    } else {
        tempElement.textContent = weather.tempC;
        feelsLikeElement.textContent = weather.feelsLikeC;
        windSpeedElement.textContent = weather.windSpeedKPH;

        // windSpeedElement.after = 'kph';
    }

    if (informationPanel.classList.contains('celsius')) {
        informationPanel.classList.remove('celsius');
        informationPanel.classList.add('fahrenheit');

        windSpeedElement.classList.remove('kph-after');
        windSpeedElement.classList.add('mph-after');

        tempElement.classList.remove('celsius-after');
        feelsLikeElement.classList.remove('celsius-after');

        tempElement.classList.add('fahrenheit-after');
        feelsLikeElement.classList.add('fahrenheit-after');
    } else {
        informationPanel.classList.remove('fahrenheit');
        informationPanel.classList.add('celsius');

        windSpeedElement.classList.remove('mph-after');
        windSpeedElement.classList.add('kph-after');

        tempElement.classList.remove('fahrenheit-after');
        feelsLikeElement.classList.remove('fahrenheit-after');
        tempElement.classList.add('celsius-after');
        feelsLikeElement.classList.add('celsius-after');
    }
}

function removeEventListeners() {
    const informationPanel = document.querySelector('.left-right');
    // Remove all click event listeners from the information panel
    const newPanel = informationPanel.cloneNode(true);
    informationPanel.parentNode.replaceChild(newPanel, informationPanel);
}
// informationPanel.addEventListener('click', toggleTemperatureUnit);

const searchButton = document.querySelector('.search-button');
const form = document.querySelector('#search-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    removeEventListeners(); // Remove previous event listeners to prevent duplicates
    handleSearch();
    form.reset(); // Reset the form after submission
});

function handleSearch() {
    const searchInput = document.querySelector('#city-input');
    const cityName = searchInput.value.trim(); // Get the input value and trim whitespace

    if (cityName) {
        safeChangeCity(cityName);
    } else {
        console.error('Please enter a valid city name');
    }
}
