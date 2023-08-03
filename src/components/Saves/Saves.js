import './Saves.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SaveContext } from '../../SaveContext';

export default function Saves() {
  const { saves } = useContext(SaveContext);
  const savedCards = saves.map(element => {
    let {name, country, id} = element;
    return (
      <Link to={`${id}`}  key={id}>
        <div className='city-name'>
            <span>{name}</span>
            <sup>{country}</sup>
        </div>
      </Link>
    )
  })

  return (
    <div className='saves'>
      <Link to='/'>
        <img className='home-button' alt='home button' src={require('../../assets/home-icon.png')}/>
      </Link>
      {saves.length ? <div className='savedCards'>{savedCards}</div> : <p className='empty-saves-message'>You haven't saved any location yet.</p>}
    </div>
  )
}