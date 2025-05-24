// button.addEventListener('click', function () {
//     const searchTerm = input.value;
//     searchGiphy(searchTerm);
//     input.value = '';
// });

const informationPanel = document.querySelector('.left-right');

function toggleTemperatureUnit(weather) {
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

// informationPanel.addEventListener('click', toggleTemperatureUnit);
export { toggleTemperatureUnit };
