import './WeatherCard.css';
import PropTypes from 'prop-types'; 
import { UnitContext } from '../../UnitContext';
import { useContext } from 'react';

export default function WeatherCard({weather}) {
  const { unit, convertTemp } = useContext(UnitContext);

  return (
    <div className='weather-card'>
      <div className='city'>
        <div className='city-name'>
          <span>{weather.name}</span>
          <sup>{weather.sys.country}</sup>
        </div>
        <div className='city-temp'>
          {convertTemp(weather.main.temp)}
          <sup>&deg;{`${unit}`}</sup>
        </div>
        <div className='info'>
          <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

WeatherCard.propTypes = {
  weather: PropTypes.object
}