import './SearchBar.css';
import { getWeather, getGeocode, getIcon } from '../../apiCalls';

export default function SearchBar() {
  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode'/>
      <input type='submit' value='submit'/>
    </div>
  );
}