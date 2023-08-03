import { Link, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SaveContext } from '../../SaveContext';
import { fetchWeather } from '../../apiCalls';
import Result from '../Result/Result';
import './SingleView.css';


export default function SingleView() {
  const {id} = useParams();
  const {saves} = useContext(SaveContext);
  const [weather, setWeather] = useState('');
  const selectedCard = saves.filter(element => element.id === id)[0]
 
  useEffect(() => {
    if (selectedCard) {
      const { lon, lat } = selectedCard;
      fetchWeather(lat, lon)
      .then(res => setWeather(res))
    }
  }, [selectedCard])

  return (
    <div className='single-view'>
      <Link to='/'><img className='home-button' alt='home button' src={require('../../assets/home-icon.png')}/></Link>
      <Result isSingleView={true} result={weather}/>
    </div>
  )
}