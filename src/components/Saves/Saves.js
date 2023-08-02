import './Saves.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SaveContext } from '../../SaveContext';

export default function Saves() {
  const { saves } = useContext(SaveContext)
  console.log('saves Saves: ', saves)

  const savedCards = saves.map(element => {
    let {name, country, id} = element;
    return (
      <div className='city-name' key={id}>
        <Link to={`/${id}`}>
          <span>{name}</span>
          <sup>{country}</sup>
        </Link>
      </div>
    )
  })

  return (
    <div className='saves' key='saves'>
      <Link to='/'><p>🏠</p></Link>
      <p>saved</p>
      <div key='savedCards'>{savedCards}</div>
    </div>
  )
}