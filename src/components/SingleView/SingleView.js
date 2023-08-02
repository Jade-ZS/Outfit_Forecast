import { Link, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SaveContext } from '../../SaveContext';
import { fetchWeather } from '../../apiCalls';
import Result from '../Result/Result';
import './SingleView.css';


export default function SingleView() {
  const {id} = useParams();
  // console.log(id)
  const {saves} = useContext(SaveContext);
  const [weather, setWeather] = useState('');

  console.log('saves', saves)
  const selectedCard = saves.filter(element => element.id === id)[0]
  // console.log('selectedCard: ', selectedCard)
  const { lon, lat } = selectedCard;
  // console.log('lon lat' , lon, lat)

  useEffect(() => {
    fetchWeather(lat, lon)
    .then(res => setWeather(res))
  }, [])

  return (
    <>
      <p>single view</p>
      <Link to='/'>🏠</Link>
      <p>{id}</p>
      <p>{Object.keys(weather)}</p>
      <Result result={weather}/>
    </>
  )
}