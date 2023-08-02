import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ButtonBar from '../ButtonBar/ButtonBar';
import { useState } from 'react';

export default function Result({result}) {
  // const [isClicked, setIsClicked] = useState({saveClicked: false, editClicked: false})
  const [saveClicked, setSaveClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [toggleCelsius, setToggleCelsius] = useState(true);

  const toggleClick = (action) => {
    if(action === 'saveClicked') {
      setSaveClicked(!saveClicked);
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
        <ButtonBar saveClicked={saveClicked} editClicked={editClicked} toggleClick={toggleClick} />
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