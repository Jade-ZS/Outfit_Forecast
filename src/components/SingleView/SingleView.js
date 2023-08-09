import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SaveContext } from '../../SaveContext';
import { fetchWeather, fetchGeocode } from '../../apiCalls';
import Result from '../Result/Result';
import './SingleView.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function SingleView() {
  console.log('singleview--------------------------------------------------')
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id)
  const {saves} = useContext(SaveContext);
  const [weather, setWeather] = useState('');
  const selectedSavedCard = saves.filter(element => element.id === id)[0];
  const [isLoading, setIsLoading] = useState(false)
  
  const parseName = id => {
    return id.slice(0, id.length-2);
  }

  useEffect(() => {
    if (selectedSavedCard) {
      setIsLoading(true);
      const { lon, lat } = selectedSavedCard;
      
      fetchWeather(lat, lon)
      .then(res => {
        console.log('before isLoading: ', isLoading)
        return res
      })
      .then(res => setWeather(res))
      .then(() => {
        setIsLoading(false)
        console.log('after isLoading: ', isLoading)
      })
    }

    if (!selectedSavedCard && id) {
      setIsLoading(true);
      const cityName = parseName(id);
      fetchGeocode(cityName)
        .then(response => response.results[0].geometry.location)
        .then(async geocode => await fetchWeather(geocode.lat, geocode.lng))
        .then(weather => {
          setIsLoading(false)
          setWeather(weather)
        })
        .catch(() => navigate('/*'))
    }
  }, [selectedSavedCard])

  return (
    <>
        <div className='single-view'>
         <Link to='/'><img className='home-button' alt='home button' src={require('../../assets/home-icon.png')}/></Link>
         {isLoading && <LoadingSpinner />}
         <Result isSingleView={true} result={weather}/>
        </div> 
    </>
  )
}