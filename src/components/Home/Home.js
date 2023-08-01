import './Home.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultContainer from '../ResultContainer/ResultContainer';

export default function Home() {
  return(
    <div className='home-page'>
      <SearchBar />
      <ResultContainer />
    </div>
  );
}