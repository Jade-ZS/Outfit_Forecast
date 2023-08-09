import './Home.css';
import { useState, useRef } from 'react';
import AlertBox from '../AlertBox/AlertBox';
import { fetchGeocode, fetchWeather, fetchForecast } from '../../apiCalls';
import Result from '../Result/Result';
import PropTypes from 'prop-types'; 
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import SearchBar from '../SearchBar/SearchBar';

export default function Home({checkErr}) {
  const handleClose = () => setClose(true);
  const submitRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
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

  const handleSubmit = async () => {
    if(!keyword.length) {
      setAlertBox('This field is required');
    } else {
      setIsLoading(true)
      const geocode = await getGeocode(keyword);
      const weather = await getWeather(geocode)
      setWeather(weather);
      setIsLoading(false)
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