import './Home.css';
import { useState, useEffect } from 'react';
import AlertBox from '../AlertBox/AlertBox';
import { fetchGeocode, fetchWeather } from '../../apiCalls';
import { Link } from 'react-router-dom';
import Result from '../Result/Result';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [ifSubmit, setIfSubmit] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState();
  const [close, setClose] = useState(true);
  const [message, setMessage] = useState('');

  const addWeather = weather => setResult(weather);
  const handleClose = () => setClose(true);
  const clearForm = () => {
    setKeyword('');
    setIsValid(true);
    setClose(true);
    setMessage('');
    setIfSubmit(false);
  }

  useEffect(() => {
    if(!isValid && ifSubmit) {
      setClose(false);
    } 
  }, [ifSubmit])
  
  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    if(!geocode.results.length) {
      setIsValid(false);
      setClose(false);
      setMessage('invalid address!!!!!');
      return 'invalid address';
    } 
    setIsValid(true);
    setClose(true);
    return geocode.results[0].geometry.location;
  }

  const getWeather = async geocode => {
      const { lat, lng } = geocode;
      const weather = await fetchWeather(lat, lng);
      return weather;
  }

  const handleSubmit = async () => {
    setIfSubmit(true);
    if(!keyword.length) {
      setIsValid(false);
      setClose(false);
      setMessage('this field is required');
      return;
    }
    const geocode = await getGeocode(keyword);
    if (typeof geocode !== 'string') {
      clearForm();
      const weather = await getWeather(geocode)
      addWeather(weather);
      return result;
    }
  }
  const handleChange = e => setKeyword(e.target.value);
  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  }

  return(
    <div className='home-page'>
      <div className='search-bar'>
        <Link to='/saved' onClick={e => {!close && e.preventDefault()}} ><span>view saved ---</span></Link>
        <input  disabled={!close} className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} onKeyDown={handleKeyDown}/>
        <input disabled={!close} type='submit' value='submit' onClick={handleSubmit}/>
      </div>
      <div className='result-container'>
        {isValid ? <Result result={result}/> : <AlertBox close={close} handleClose={handleClose} message={message}/>}
      </div>
    </div>
  );
}