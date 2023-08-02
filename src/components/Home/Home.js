import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultContainer from '../ResultContainer/ResultContainer';
import { useState } from 'react';

export default function Home({saveLocation}) {
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState();

  const addWeather = weather => {
    setResult(weather);
  }

  const checkAddress = value => {
    setIsValid(value);
  }

  return(
    <div className='home-page'>
      <SearchBar addWeather={addWeather} checkAddress={checkAddress}/>
      <ResultContainer isValid={isValid} result={result} saveLocation={saveLocation}/>
    </div>
  );
}