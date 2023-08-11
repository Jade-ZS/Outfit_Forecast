import './WeatherDetails.css';
import { useContext } from 'react';
import { UnitContext } from '../../UnitContext';

export default function WeatherDetails({item}) {
  const { unit, convertTemp } = useContext(UnitContext);
  let feelTemp = item.main.feels_like;

  return (
    <div className='daily-details'>
      <div className='daily-details-item'>
        <label>Pressure:</label>
        <label>{item.main.pressure} hPa</label>
      </div>
      <div className='daily-details-item'>
        <label>Humidity:&nbsp;</label>
        <label>{item.main.humidity} %</label>
      </div>
      <div className='daily-details-item'>
        <label>Clouds:&nbsp;</label>
        <label>{item.clouds.all} %</label>
      </div>
      <div className='daily-details-item'>
        <label>Wind Speed:&nbsp;</label>
        <label>{item.wind.speed} m/s</label>
      </div>
      {item.main.sea_level && <div className='daily-details-item'>
        <label>Sea Level:&nbsp;</label>
        <label>{item.main.sea_level} m</label>
      </div>}
      <div className='daily-details-item'>
        <label>Feels like:&nbsp;</label>
        <label>{convertTemp(feelTemp)} &deg;{unit}</label>
      </div>
    </div>
  );
}