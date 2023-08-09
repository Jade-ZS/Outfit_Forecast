import './Home.css';
import { useState, useEffect, useRef, useContext } from 'react';
import AlertBox from '../AlertBox/AlertBox';
import { fetchGeocode, fetchWeather, fetchForecast } from '../../apiCalls';
import { Link } from 'react-router-dom';
import Result from '../Result/Result';
import PropTypes from 'prop-types'; 
import { SaveContext } from '../../SaveContext'; 
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function Home({checkErr}) {
  const submitRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [ifSubmit, setIfSubmit] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [weather, setWeather] = useState();
  const [forecasat, setforecast] = useState({});
  const [close, setClose] = useState(true);
  const [message, setMessage] = useState('');

  const closeAlertBox = () => {
    setIsValid(true);
    setClose(true);
    setMessage('');
  }

  const clearForm = () => {
    setKeyword('');
    closeAlertBox();
    setIfSubmit(false);
    setWeather();
  }

  const setAlertBox = (text) => {
    setIsValid(false);
    setClose(false);
    setWeather();
    setMessage(text)
  }
  
  const getGeocode = async keyword => {
    try {
      const geocode = await fetchGeocode(keyword)
      if(geocode === 'invalid address!') {
        setAlertBox(geocode);
      } else {
        closeAlertBox();
      }
      return geocode;
    } catch {
      checkErr(true);
    }
  }

  const getWeather = async geocode => {
    try {
      if(typeof geocode === 'object') {
        const { lat, lng } = geocode;
        checkErr(false);
        const weather = await fetchWeather(lat, lng);
        return weather;
      }
    } catch {
      await checkErr(true);
    }
  }

  const handleSubmit = async () => {
    setIfSubmit(true);
    if(!keyword.length) {
      setAlertBox('This field is required');
      return;
    }
    const geocode = await getGeocode(keyword);
    if (typeof geocode !== 'string') {
      clearForm();
      setIsLoading(true)
      const weather = await getWeather(geocode)
      setWeather(weather);
      setIsLoading(false)
      return weather;
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
      <div className='search-container'>
        <Link to='/saved' onClick={e => {!close && e.preventDefault()}} >
          <img 
            className={`view-saved-button ${!close && 'noHover'}`}
            src={require('../../assets/view-saved.png')}/>
        </Link>
        <div className='search-bar'>
          <input disabled={!close} className='search-input' value={keyword} placeholder='search by city, address or zipcode' onChange={handleChange} onKeyDown={handleKeyDown}/>
          <Link to='/result'><input disabled={!close} ref={submitRef} type='submit' value='submit' onClick={handleSubmit}/></Link>
        </div>
      </div>
      {!isValid && <AlertBox close={close} handleClose={setClose} message={message}/>}
      <div className='result-container'>
        {isLoading ? <LoadingSpinner /> :
        <div className={`welcome  ${weather && 'hidden'}`}>
          <img className={`welcome-rabbits`} src={require('../../assets/welcome-rabbits.png')}/>
          <p>Let's explore weather!</p>
        </div>
        }
        {isValid && <Result isSingleView={false} result={weather}/>}
      </div>
    </div>
  );
}

Home.propTypes = {
  checkErr: PropTypes.func
}