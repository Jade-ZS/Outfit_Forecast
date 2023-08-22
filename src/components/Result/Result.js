import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { SaveContext } from '../../SaveContext';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import Forecast from '../Forecast/Forecast';
import Clothes from '../Clothes/Clothes';
import SaveButton from '../SaveButton/SaveButton';

export default function Result({forecast, isSingleView, weather, isLoadingSingle}) {

  let location = weather && {
    ...weather.coord, 
    name:weather.name, 
    country:weather.sys.country, 
    id:weather.name+weather.sys.country
  };

  return (
    <>
      <div className={`result-card ${isLoadingSingle && 'hidden'}`}>
        {weather && 
        <>
          <SaveButton isSingleView={isSingleView} location={location}/>

          <div className='result-display'>
            <div className='result-line'>
              <WeatherCard weather={weather}/>
              <Clothes weather={weather}/>
            </div>
            <Forecast forecast={forecast}/>
          </div>
        </>
        }
      </div>
    </>
  )
}

Result.propTypes = {
  isSingleView: PropTypes.bool,
  // result: PropTypes.object 
}