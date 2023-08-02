import './ButtonBar.css';
import { SaveContext } from '../../SaveContext';
import { useContext } from 'react';

export default function ButtonBar({result, toggleCelsius, saveClicked, editClicked, toggleClick}) {
  const { saves } = useContext(SaveContext);
  const isSaved = saves.some(location => location.name === result.name);
  console.log('isSaved ', isSaved)

  return (
    <div className='button-bar'>
        <p 
          className={`${toggleCelsius ? 'celsius' : 'fahrenheit' }`}
          onClick={() => toggleClick('toggleCelsius')}
        >toggle</p>
        <div>
          <img 
            className={`edit-button ${editClicked && 'clicked'}`} 
            src='https://img.icons8.com/?size=512&id=95154&format=png'
            alt='edit button'
            onClick={() => toggleClick('editClicked')}/>
          <img 
            className={`save-button ${saveClicked && 'clicked'}`} 
            src='https://img.icons8.com/?size=512&id=82461&format=png'
            alt='save button'
            onClick={() => toggleClick('saveClicked')}/>
        </div>
      </div>
  )
}