//import styles
import './styles/reset.css';
import './styles/styles.scss';

import { getWeatherData } from './api.js';

getWeatherData('New Jersey')
    .then((data) => {
        console.log('Weather data:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
