import './Home.css';
import { useState, useRef } from 'react';
import AlertBox from '../AlertBox/AlertBox';
import { fetchGeocode, fetchWeather, fetchForecast } from '../../apiCalls';
import Result from '../Result/Result';
import PropTypes from 'prop-types'; 
import SearchBar from '../SearchBar/SearchBar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


export default function Home({checkErr}) {
  const handleClose = () => setClose(true);
  const submitRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState({});
  const [close, setClose] = useState(true);
  const [message, setMessage] = useState('');

  const closeAlertBox = () => {
    setIsValid(true);
    setClose(true);
    setMessage('');
  }

  const clearForm = () => {
    closeAlertBox();
    setKeyword('');
  }

  const setAlertBox = (text) => {
    setIsValid(false);
    setClose(false);
    setMessage(text);
  }
  
  const getGeocode = async keyword => {
    try {
      const geocode = await fetchGeocode(keyword)
      if (geocode === 'invalid address!') setAlertBox(geocode);
      return geocode;
    } catch {
      checkErr(true);
    }
  }

  const getWeather = async geocode => {
    try {
      if(geocode !== 'invalid address!') {
        checkErr(false);
        clearForm();
        const { lat, lng } = geocode;
        const weather = await fetchWeather(lat, lng);
        return weather;
      }
    } catch {
      checkErr(true);
    }
  }

  const getForecast = async geocode => {
    try {
      if(geocode !== 'invalid address!') {
        const { lat, lng } = geocode;
        const forecast = await fetchForecast(lat, lng);
        return forecast;
      }
    } catch {
      checkErr(true);
    }
  }

  const handleSubmit = async () => {
    if(!keyword.length) {
      setAlertBox('This field is required');
    } else {
      setIsLoading(true)
      const geocode = await getGeocode(keyword);
      const weather = await getWeather(geocode);
      const forecast = await getForecast(geocode);
      setWeather(weather);
      setForecast(forecast);
      setIsLoading(false);
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
      <SearchBar close={close} keyword={keyword} handleChange={handleChange} handleKeyDown={handleKeyDown} handleSubmit={handleSubmit} submitRef={submitRef}/>
      {!isValid && <AlertBox close={close} handleClose={handleClose} message={message}/>}
      <div className='result-container'>
        {isLoading ? <LoadingSpinner /> :
        <>
        <div className={`welcome  ${weather && 'hidden'}`}>
          <img className={`welcome-rabbits`} src={require('../../assets/welcome-rabbits.png')}/>
          <p>Let's explore weather!</p>
        </div>
        {isValid && <Result isLoading={isLoading} forecast={forecast} isSingleView={false} weather={weather} />}
        </>}
      </div>
    </div>
  );
}

Home.propTypes = {
  checkErr: PropTypes.func
}