import './WeatherCard.css';
import PropTypes from 'prop-types'; 

export default function WeatherCard({result}) {
  return (
    <div className='weather-card'>
      <div className='city'>
        <div className='city-name'>
          <span>{result.name}</span>
          <sup>{result.sys.country}</sup>
        </div>
        <div className='city-temp'>
          {Math.round(result.main.temp)}
          <sup>&deg;C</sup>
        </div>
        <div className='info'>
          <img className='city-icon' src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`} alt={result.weather[0].description}></img>
          <p>{result.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

WeatherCard.propTypes = {
  result: PropTypes.object
}