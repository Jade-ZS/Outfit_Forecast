import './SearchBar.css';
import { useState } from 'react';
import { getGeocode } from '../../apiCalls';

export default function SearchBar() {

  const [keyword, setKeyword] = useState('');
  const handleSubmit = () => {
    getGeocode(keyword).then(res => console.log('res: ', res))
  }

  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode' onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <input type='submit' value='submit' onClick={handleSubmit}/>
    </div>
  )
}