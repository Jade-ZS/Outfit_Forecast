import './WeatherCard.css';

export default function WeatherCard({result}) {
  return (
    <div className='weather-card'>
      {console.log('weathercard result: ', result)}
      <div className='city-name'>
        {/* <span>{JSON.stringify(result)}</span> */}
        <span>{result.name}</span>
        <sup>{result.sys.country}</sup>
      </div>
    </div>
  )
}