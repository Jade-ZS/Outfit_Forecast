import './SearchBar.css';
import { useState } from 'react';
import { getGeocode } from '../../apiCalls';

export default function SearchBar() {

  const [keyword, setKeyword] = useState('');
  const handleSubmit = async () => {
    const geocode = await getGeocode(keyword)
    console.log('geocode: ', geocode.results[0].geometry.location)
    if(!geocode.results.length) {
      return 'invalid address!'
    } 
    return geocode.results[0].geometry.location;
  }

  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode' onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}