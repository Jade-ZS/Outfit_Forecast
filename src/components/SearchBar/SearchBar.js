import './SearchBar.css';
import { useState } from 'react';
import { fetchGeocode, fetchWeather } from '../../apiCalls';

export default function SearchBar({addWeather, checkAddress}) {

  const [keyword, setKeyword] = useState('');
  const [weatherResult, setWeatherResult] = useState('');

  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    if(!geocode.results.length) {
      checkAddress(false);
      return 'invalid address!!!';
    } 
    checkAddress(true);
    return geocode.results[0].geometry.location;
  }

  const getWeather = async geocode => {
      const { lat, lng } = geocode;
      const weather = await fetchWeather(lat, lng);
      return weather;
  }

  const handleSubmit = async () => {
    const geocode = await getGeocode(keyword);
    if (typeof geocode !== 'string') {
      const weather = await getWeather(geocode)
      setWeatherResult(weather);
      addWeather()
      return weatherResult;
    }
  }

  const handleChange = e => {
    setKeyword(e.target.value);
    if (e.keycode === 13) {
      handleSubmit();
    }
  }

  return(
    <div className='search-bar'>
      <input className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} />
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}