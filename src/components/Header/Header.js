import './Header.css';
import { useContext, useState, useEffect } from 'react';
import { UnitContext } from '../../UnitContext';

export default function Header() {
  const {unit, setUnit} = useContext(UnitContext);
  const [currentLat, setCurrentLat] = useState('');
  const [currentLng, setCurrentLng] = useState('');
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
      }, e => {
        console.log(e)
      })
    }
  }

  return (
    <header>
            <p>Outfit Forecast</p>
          <button className={`f-button ${unit === 'F' && 'clicked'}`} onClick={() => setUnit('F')}>&deg;F</button>
          <button className={`c-button ${unit === 'C' && 'clicked'}`} onClick={() => setUnit('C')}>&deg;C</button>
          <button onClick={getCurrentLocation}>location</button>
          <p>lat: {currentLat}</p>
          <p>lng: {currentLng}</p>
    </header>
  )
}