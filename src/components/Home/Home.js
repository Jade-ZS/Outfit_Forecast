import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultContainer from '../ResultContainer/ResultContainer';
import { useState } from 'react';
import AlertBox from '../AlertBox/AlertBox';

export default function Home({saveLocation}) {
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState();
  const [close, setClose] = useState(false);
  const addWeather = weather => setResult(weather);
  const checkAddress = value => setIsValid(value);
  const disableLink = e => e.preventDefault();
  const handleClose = () => setClose(true);

  return(
    <div className='home-page'>
      <SearchBar close={close} addWeather={addWeather} checkAddress={checkAddress}/>
      <ResultContainer isValid={isValid} result={result} saveLocation={saveLocation}/>
      <AlertBox close={close} message='Invalid Address!!!' handleClose={handleClose}/>
    </div>
  );
}