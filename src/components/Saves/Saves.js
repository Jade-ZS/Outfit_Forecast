import './Saves.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SaveContext } from '../../SaveContext';

export default function Saves() {
  const { saves, setSaves } = useContext(SaveContext)
  console.log('saves Saves: ', saves)
  return (
    <div className='saves'>
      <Link to='/'><p>🏠</p></Link>
      <p>saved</p>
      <h1>let us save</h1>
    </div>
  )
}