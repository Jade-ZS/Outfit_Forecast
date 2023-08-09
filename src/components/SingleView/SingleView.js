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
  const {saves, setIsLoading, isLoading} = useContext(SaveContext);
  const [weather, setWeather] = useState('');
  const selectedSavedCard = saves.filter(element => element.id === id)[0];
  
  const parseName = id => {
    return id.slice(0, id.length-2);
  }
 
  useEffect(() => {
    if (selectedSavedCard) {
      const { lon, lat } = selectedSavedCard;
      fetchWeather(lat, lon)
      .then(res => setWeather(res))
    }

    if (!selectedSavedCard && id) {
      const cityName = parseName(id);
      setIsLoading(true)
      fetchGeocode(cityName)
        .then(response => response.results[0].geometry.location)
        .then(async geocode => await fetchWeather(geocode.lat, geocode.lng))
        .then(weather => setWeather(weather))
        .then(() => setIsLoading(false))
        .catch(() => navigate('/*'))
    }
  }, [selectedSavedCard])

  return (
    <>
        <div className='single-view'>
          <Link to='/'><img className='home-button' alt='home button' src={require('../../assets/home-icon.png')}/></Link>
         <Result isLoading={isLoading} isSingleView={true} result={weather}/>
        </div> 
    </>
  )
}