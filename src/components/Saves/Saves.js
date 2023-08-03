import './Saves.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SaveContext } from '../../SaveContext';

export default function Saves() {
  const { saves } = useContext(SaveContext);
  const savedCards = saves.map(element => {
    let {name, country, id} = element;
    return (
      <div className='city-name' key={id}>
        <Link to={`${id}`}>
          <span>{name}</span>
          <sup>{country}</sup>
        </Link>
      </div>
    )
  })

  return (
    <div className='saves' key='saves'>
      <Link to='/'><p>🏠</p></Link>
      {saves.length ? <div key='savedCards'>{savedCards}</div> : <p>You haven't saved any location yet.</p>}
     
    </div>
  )
}