import './Saves.css';
import { Link } from 'react-router-dom';

export default function Saves() {
  return (
    <div className='saves'>
      <Link to='/'><p>🏠</p></Link>
      <p>saved</p>
      <h1>let us save</h1>
    </div>
  )
}