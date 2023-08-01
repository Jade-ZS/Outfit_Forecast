import './SearchBar.css';
import { useState } from 'react';
import { fetchGeocode } from '../../apiCalls';

export default function SearchBar() {

  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const getGeocode = async keyword => {
    const geocode = await fetchGeocode(keyword)
    console.log('geocode: ', geocode.results[0].geometry.location)
    if(!geocode.results.length) {
      return 'invalid address!'
    } 
    return geocode.results[0].geometry.location;
  }

  const 

  const handleSubmit = async () => {
    const geocode = getGeocode(keyword);

  }

  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode' onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}