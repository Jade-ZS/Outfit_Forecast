import './ResultContainer.css';
import WeatherCard from '../WeatherCard/WeatherCard';

export default function ResultContainer({isValid, result}) {
  return (
    <div className='result-container'>
      {console.log('result isvalid? : ', isValid)}
      <div className='button-bar'>
        <p>toggle</p>
        <div>
          {/* <span>edit--</span> */}
          <img className='edit-button' src='https://img.icons8.com/?size=512&id=95154&format=png'/>
          {/* <span>save--</span> */}
          <img className='save-button' src='https://img.icons8.com/?size=512&id=82461&format=png'/>
        </div>
      </div>
      {isValid ? <WeatherCard result={result}/> : <p>Invalid Address!!!</p>}
    </div>
  )
}