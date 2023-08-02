import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { SaveContext } from '../../SaveContext';
import { useState, useContext, useEffect } from 'react';

export default function Result({result}) {
  const { saves, addSave, deleteSave } = useContext(SaveContext);
  const [isSaved, setIsSaved] = useState(false);
  const location = result && result.coord;

  const checkIfSaved = () => {
    const output = saves.some(element => JSON.stringify(element) === JSON.stringify(location));
    console.log('checkIfSaved output: ', output, 'isSaved: ', isSaved)
    return output;
  }

  useEffect(() => {
    setIsSaved(checkIfSaved());
  }, [saves, location])

  const handleSaveClick = () => {
    if(isSaved) {
      deleteSave(location);
    } else {
      addSave(location);
    }
    console.log('onclick saves: ', saves)
  }

  return (
    <div>
      {result && 
      <>
       <img 
          className={`save-button ${isSaved && 'clicked'}`}
          src='https://img.icons8.com/?size=512&id=82461&format=png'
          alt='save button'
          onClick = {handleSaveClick}
        />

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