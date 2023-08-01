import './SearchBar.css';

export default function SearchBar() {
  return(
    <div className='search-bar'>
      <input placeholder='search by city, address or zipcode'/>
      <input type='submit' value='submit'/>
    </div>
  );
}