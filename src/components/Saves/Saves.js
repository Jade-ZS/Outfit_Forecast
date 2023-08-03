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
      {console.log('saves: ', saves)}
      <Link to='/'><p className='home-button'>🏠</p></Link>
      {saves.length ? <div className='savedCards'>{savedCards}</div> : <p>You haven't saved any location yet.</p>}
    </div>
  )
}