//import styles
import './styles/reset.css';
import './styles/styles.scss';

// importing images
import clouds from './img/clouds.webp';

import { getWeatherData } from './api.js';
import { toggleTemperatureUnit } from './eventListeners.js';

const weatherImageUpdate = document.querySelector('.weather-image-update');
weatherImageUpdate.src = clouds; // Default image

// getWeatherData('New Jersey')
//     .then((data) => {
//         console.log('Weather data:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
