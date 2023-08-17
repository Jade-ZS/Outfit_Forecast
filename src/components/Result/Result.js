import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { SaveContext } from '../../SaveContext';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import Forecast from '../Forecast/Forecast';
import Clothes from '../Clothes/Clothes';

export default function Result({forecast, isSingleView, weather, isLoadingSingle}) {
  const { saves, addSave, deleteSave } = useContext(SaveContext);
  const [isSaved, setIsSaved] = useState(false);
  let location = weather && {
    ...weather.coord, 
    name:weather.name, 
    country:weather.sys.country, 
    id:weather.name+weather.sys.country
  };

  useEffect(() => {
    const checkIfSaved = () => saves.some(element => JSON.stringify(element) === JSON.stringify(location));
    setIsSaved(checkIfSaved());
  }, [saves, location])

  const handleSaveClick = () => isSaved ? deleteSave(location) : addSave(location);

  return (
    <div className={`result-card ${isLoadingSingle && 'hidden'}`}>
      {weather && 
      <>
        <div className='button-wrapper'>
          <img 
            className={`save-button ${isSaved && 'clicked'}`}
            src='https://img.icons8.com/?size=512&id=82461&format=png'
            alt='save button'
            onClick = {handleSaveClick}
          />
          {isSingleView && <Link to='/saved'><img className='close-button' alt='close button' src={require('../../assets/close-button.png')}/></Link>}
        </div>

        <div className='result-display'>
          <div className='result-line'>
            <WeatherCard weather={weather}/>
            {/* <img 
              className='cloth-img' 
              src={require('../../assets/autum-sweaters.JPG')} 
              alt='sweaters'
            /> */}
            <Clothes />
          </div>
          <Forecast forecast={forecast}/>
        </div>
      </>
      }
    </div>
  )
}

Result.propTypes = {
  isSingleView: PropTypes.bool,
  // result: PropTypes.object 
}