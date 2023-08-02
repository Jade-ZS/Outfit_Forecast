import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { SaveContext } from '../../SaveContext';
import { useState, useContext } from 'react';

export default function Result({result}) {
  const { saves, addSave, deleteSave } = useContext(SaveContext);
  const [isSaved, setIsSaved] = useState(true);


  return (
    <div>
      {result && 
      <>
       <img 
          className={`save-button ${!isSaved && 'clicked'}`}
          src='https://img.icons8.com/?size=512&id=82461&format=png'
          alt='save button'
          onClick = {() => {
            if(isSaved) {
              deleteSave(result.coord);
            } else {
              addSave(result.coord);
            }
            console.log('onclick saves: ', saves)
          }}
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