import './Result.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ButtonBar from '../ButtonBar/ButtonBar';

export default function Result({result}) {
  return (
    <div>
      {result && 
      <>
        <ButtonBar />
        <div className='result-display'>
          <WeatherCard result={result}/>
          <img className='cloth-img' src={require('../../assets/autum-sweaters.JPG')} alt='sweaters'/>
        </div>
      </>
      }
    </div>
  )
}