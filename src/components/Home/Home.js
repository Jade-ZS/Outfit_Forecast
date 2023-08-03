import './Home.css';
import { useState, useEffect, useRef } from 'react';
import AlertBox from '../AlertBox/AlertBox';
import { fetchGeocode, fetchWeather } from '../../apiCalls';
import { Link } from 'react-router-dom';
import Result from '../Result/Result';

export default function Home({fetchErr, checkErr}) {
  const submitRef = useRef();

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
  }, [ifSubmit, isValid])
  
  const getGeocode = async keyword => {
    try {
      const geocode = await fetchGeocode(keyword)
      console.log('try geocode: ', geocode)
      if(!geocode.results.length) {
        setIsValid(false);
        setClose(false);
        setMessage('invalid address!!!!!');
        return 'invalid address';
      } 
      setIsValid(true);
      setClose(true);
      return geocode.results[0].geometry.location;
    } catch {
      console.log('geocode catch: ', fetchErr)
      checkErr(true);
    }
   
  }

  const getWeather = async geocode => {
    const { lat, lng } = geocode;
    try {
      checkErr(false);
      const weather = await fetchWeather(lat, lng);
      console.log('try weather: ', weather)
      return weather;
    } catch {
      await checkErr(true);
      console.log('weather catch: ', fetchErr)
    }
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
      try {
        const weather = await getWeather(geocode)
        addWeather(weather);
        return result;
      } catch {
        checkErr(true);
        console.log('err handle here')
      }
    }
  }
  const handleChange = e => setKeyword(e.target.value);
  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      submitRef.current.click();
      handleSubmit();
    }
  }

  return(
    <div className='home-page'>
      <div className='search-bar'>
        <Link to='/saved' onClick={e => {!close && e.preventDefault()}} ><span>view saved ---</span></Link>
        <input disabled={!close} className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} onKeyDown={handleKeyDown}/>
        <Link to='/result'><input disabled={!close} ref={submitRef} type='submit' value='submit' onClick={handleSubmit}/></Link>
      </div>
      <div className='result-container'>
        {isValid ? <Result result={result}/> : <AlertBox close={close} handleClose={handleClose} message={message}/>}
      </div>
    </div>
  );
}