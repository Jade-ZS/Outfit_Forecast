import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='err-page'>
      <Link to='/'><p className='home-button'>🏠</p></Link>
      <img alt='raining cloud' src='https://i.gifer.com/X5Na.gif'/>
      <h1>Ooopsy...</h1>
      <p>Page Not Found!</p>
    </div>
  )
}