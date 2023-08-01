import './ResultContainer.css';
import WeatherCard from '../WeatherCard/WeatherCard';

export default function ResultContainer({isValid, result}) {
  return (
    <div className='result-container'>
      {console.log('result isvalid? : ', isValid)}
      <div className='button-bar'>
        <p>toggle</p>
        <div>
          <span>edit--</span>
          <span>save--</span>
        </div>
      </div>
      {isValid ? <WeatherCard result={result}/> : <p>Invalid Address!!!</p>}
    </div>
  )
}