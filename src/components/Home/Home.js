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
    setResult();
  }

  useEffect(() => {
    if(!isValid && ifSubmit) {
      setClose(false);
    } 
  }, [ifSubmit, isValid])
  
  const getGeocode = async keyword => {
    try {
      const geocode = await fetchGeocode(keyword)
      if(!geocode.results.length) {
        setIsValid(false);
        setClose(false);
        setResult();
        setMessage('invalid address!!!!!');
        return 'invalid address';
      } 
      setIsValid(true);
      setClose(true);
      return geocode.results[0].geometry.location;
    } catch {
      checkErr(true);
    }
   
  }

  const getWeather = async geocode => {
    const { lat, lng } = geocode;
    try {
      checkErr(false);
      const weather = await fetchWeather(lat, lng);
      return weather;
    } catch {
      await checkErr(true);
    }
  }

  const handleSubmit = async () => {
    setIfSubmit(true);
    if(!keyword.length) {
      setIsValid(false);
      setClose(false);
      setMessage('this field is required');
      setResult();
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
      submitRef.current.click();
      handleSubmit();
    }
  }

  return(
    <div className='home-page'>
      <div className='search-bar'>
        <Link to='/saved' onClick={e => {!close && e.preventDefault()}} >
          <img 
            className={`view-saved-button ${!close && 'noHover'}`}
            src={require('../../assets/view-saved.png')}/>
        </Link>
        <input disabled={!close} className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} onKeyDown={handleKeyDown}/>
        <Link to='/result'><input disabled={!close} ref={submitRef} type='submit' value='submit' onClick={handleSubmit}/></Link>
      </div>
      <div className='result-container'>
        <img className={`welcome-rabbits ${result && 'hidden'}`} src={require('../../assets/welcome-rabbits.png')}/>
        {isValid ? <Result result={result}/> : <AlertBox close={close} handleClose={handleClose} message={message}/>}
      </div>
    </div>
  );
}