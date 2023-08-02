import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ButtonBar from '../ButtonBar/ButtonBar';
import { SaveContext } from '../../SaveContext';
import { useState, useContext } from 'react';

export default function Result({result}) {
  // const [isClicked, setIsClicked] = useState({saveClicked: false, editClicked: false})
  const [saveClicked, setSaveClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [toggleCelsius, setToggleCelsius] = useState(true);
  const { addSave, deleteSave } = useContext(SaveContext);
  const toggleClick = (action) => {
    if(action === 'saveClicked') {
      setSaveClicked(!saveClicked);
      saveClicked ? addSave(result) : deleteSave(result);
    }
    if(action === 'editClicked') {
      setEditClicked(!editClicked);
    }
    if(action === 'toggleCelsius') {
      setToggleCelsius(!toggleCelsius);
    }
  }

  return (
    <div>
      {result && 
      <>
        <ButtonBar result={result} saveClicked={saveClicked} editClicked={editClicked} toggleCelsius={toggleCelsius} toggleClick={toggleClick} />
        <div className='result-display'>
          <WeatherCard result={result}/>
          <img 
            className='cloth-img' 
            src={require('../../assets/autum-sweaters.JPG')} 
            alt='sweaters'/>
        </div>
      </>
      }
    </div>
  )
}