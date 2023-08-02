import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ButtonBar from '../ButtonBar/ButtonBar';
import { SaveContext } from '../../SaveContext';
import { useState, useContext } from 'react';

export default function Result({result}) {
  // const [isClicked, setIsClicked] = useState({saveClicked: false, editClicked: false})
  const [saveClicked, setSaveClicked] = useState(false);
  const { addSave, deleteSave } = useContext(SaveContext);
  const toggleClick = (action) => {
    if(action === 'saveClicked') {
      setSaveClicked(!saveClicked);
      saveClicked ? addSave(result) : deleteSave(result);
    }
  }

  return (
    <div>
      {result && 
      <>
       <img 
          className={`save-button ${saveClicked && 'clicked'}`} 
          src='https://img.icons8.com/?size=512&id=82461&format=png'
          alt='save button'
          onClick={() => toggleClick('saveClicked')}/>

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