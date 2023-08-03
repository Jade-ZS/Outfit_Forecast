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
    <>
      <p>single view</p>
      <Link to='/'>🏠</Link>
      <div>
      <Link to='/saved'>X</Link>
      </div>
      <p>{id}</p>
      <p>{Object.keys(weather)}</p>
      <Result result={weather}/>
    </>
  )
}