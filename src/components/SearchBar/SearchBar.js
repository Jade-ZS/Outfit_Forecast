import './SearchBar.css';
import { useState } from 'react';
import { fetchGeocode, fetchWeather } from '../../apiCalls';
import { Link } from 'react-router-dom';

export default function SearchBar({addWeather, checkAddress}) {

  const [keyword, setKeyword] = useState('');
  const [weatherResult, setWeatherResult] = useState('');

  const clearForm = () => {
    setKeyword('');
  }

  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    // console.log('get geocode: ', geocode)
    if(!geocode.results.length) {
      checkAddress(false);
      return 'invalid address!!!';
    } 
    checkAddress(true);
    // console.log('getgeocode obj: ', geocode)
    return geocode.results[0].geometry.location;
  }

  const getWeather = async geocode => {
    // console.log('get weather geocode: ', geocode)
      const { lat, lng } = geocode;
      const weather = await fetchWeather(lat, lng);
      // console.log('get weather weather: ', weather)
      return weather;
  }

  const handleSubmit = async () => {
    if(!keyword.length) {
      alert('this field is required');
      return;
    }

    const geocode = await getGeocode(keyword);
    // console.log('handle submit geocode: ', geocode)
    if (typeof geocode !== 'string') {
      clearForm();
      // console.log('valid geocode')
      const weather = await getWeather(geocode)
      setWeatherResult(weather);
      addWeather(weather);
      // console.log('weather result: ', weatherResult)
      return weatherResult;
    }
  }

  const handleChange = e => {
    setKeyword(e.target.value);
  }

  const handleKeyDown = e => {
    // console.log('keycode: ', e.code)
    if (e.code === 'Enter') {
      // console.log('here keycode')
      handleSubmit();
    }
  }

  return(
    <div className='search-bar'>
      <Link to='/saved'><span>view saved ---</span></Link>
      <input required className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} onKeyDown={handleKeyDown}/>
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}