import './ButtonBar.css';
import { SaveContext } from '../../SaveContext';
import { useContext } from 'react';

export default function ButtonBar({result, toggleCelsius, saveClicked, editClicked, toggleClick}) {
  const { saves } = useContext(SaveContext);
  const isSaved = saves.some(location => location.name === result.name);
  console.log('isSaved ', isSaved)

  return (
    <div className='button-bar'>
       
      </div>
  )
}