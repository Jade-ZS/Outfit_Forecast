import './Forecast.css';
import { fetchForecast } from '../../apiCalls';
import { useState } from 'react';

export default function Forecast() {
  const [forecasat, setforecast] = useState({});
  
  return (
    <div className='forecast-container'>
    </div>
  )
}