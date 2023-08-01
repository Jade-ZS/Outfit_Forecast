import './SearchBar.css';
import { useState } from 'react';
import { fetchGeocode, fetchWeather } from '../../apiCalls';

export default function SearchBar() {

  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    if(!geocode.results.length) {
      return 'invalid address!!!'
    } 
    return geocode.results[0].geometry.location;
  }

  const getWeather = async geocode => {
      const { lat, lng } = geocode;
      const weather = await fetchWeather(lat, lng);
      return weather;
  }

  const handleSubmit = async () => {
    const geocode = await getGeocode(keyword);
    if (typeof geocode === 'string') {
      setResult({status: 'failed', content: geocode})
    } else {
      const weather = await getWeather(geocode)
      setResult({status: 'suceeded', content: weather})
    }
    console.log(result)
    return result.content;
  }

  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode' onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}