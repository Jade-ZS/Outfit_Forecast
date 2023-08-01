import './SearchBar.css';
import { useState } from 'react';
import { fetchGeocode, fetchWeather } from '../../apiCalls';

export default function SearchBar({addWeather, checkAddress}) {

  const [keyword, setKeyword] = useState('');
  const [weatherResult, setWeatherResult] = useState('');

  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    console.log('get geocode: ', geocode)
    if(!geocode.results.length) {
      checkAddress(false);
      return 'invalid address!!!';
    } 
    checkAddress(true);
    return geocode.results[0].geometry.location;
  }

  const getWeather = async geocode => {
    console.log('get weather geocode: ', geocode)
      const { lat, lng } = geocode;
      const weather = await fetchWeather(lat, lng);
      console.log('get weather weather: ', weather)
      return weather;
  }

  const handleSubmit = async () => {
    const geocode = await getGeocode(keyword);
    console.log('handle submit geocode: ', geocode)
    if (typeof geocode !== 'string') {
      console.log('valid geocode')
      const weather = await getWeather(geocode)
      setWeatherResult(weather);
      addWeather(weather);
      console.log('weather result: ', weatherResult)
      return weatherResult;
    }
  }

  const handleChange = e => {
    setKeyword(e.target.value);

    // TO DO
    console.log('keycode: ', e.keycode)
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