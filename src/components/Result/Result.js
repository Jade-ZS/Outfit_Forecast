import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { SaveContext } from '../../SaveContext';
import { useState, useContext, useEffect } from 'react';

export default function Result({result}) {
  const { saves, addSave, deleteSave } = useContext(SaveContext);
  const [isSaved, setIsSaved] = useState(false);
  let location = result && {
    ...result.coord, 
    name:result.name, 
    country:result.sys.country, 
    id:result.name+result.sys.country
  };

  useEffect(() => {
    const checkIfSaved = () => saves.some(element => JSON.stringify(element) === JSON.stringify(location));
    setIsSaved(checkIfSaved());
  }, [saves, location, isSaved])

  const handleSaveClick = () => isSaved ? deleteSave(location) : addSave(location);

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