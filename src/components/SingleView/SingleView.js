import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SaveContext } from '../../SaveContext';
import { fetchWeather, fetchGeocode } from '../../apiCalls';
import Result from '../Result/Result';
import './SingleView.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function SingleView() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {saves} = useContext(SaveContext);
  const [weather, setWeather] = useState('');
  const selectedSavedCard = saves.filter(element => element.id === id)[0];
  const [isLoadingSingle, setIsLoadingSingle] = useState(false)
  
  const parseName = id => {
    return id.slice(0, id.length-2);
  }

  useEffect(() => {
    if (selectedSavedCard) {
      setIsLoadingSingle(true);
      const { lon, lat } = selectedSavedCard;
      
      fetchWeather(lat, lon)
      .then(res => setWeather(res))
      .then(() => setIsLoadingSingle(false))
    }

    if (!selectedSavedCard && id) {
      setIsLoadingSingle(true);
      const cityName = parseName(id);
      fetchGeocode(cityName)
        .then(async geocode => await fetchWeather(geocode.lat, geocode.lng))
        .then(weather => {
          setIsLoadingSingle(false)
          setWeather(weather)
        })
        .catch(() => navigate('/*'))
    }
  }, [selectedSavedCard])

  return (
    <>
        <div className='single-view'>
         <Link to='/'><img className='home-button' alt='home button' src={require('../../assets/home-icon.png')}/></Link>
         {isLoadingSingle && <LoadingSpinner />}
         <Result isSingleView={true} result={weather} isLoadingSingle={isLoadingSingle}/>
        </div> 
    </>
  )
}