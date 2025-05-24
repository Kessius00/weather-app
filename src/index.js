//import styles
import './styles/reset.css';
import './styles/styles.scss';

// importing images
import cloudIncoming from './img/cloudincoming.webp';
import thunder from './img/thunder.webp';
import sunnyClouds from './img/sunnyclouds.webp';
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
