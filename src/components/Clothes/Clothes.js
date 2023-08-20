import './Clothes.css';
import clothes from '../../clothData';

export default function Clothes({weather}) {
  
  const temp = weather.main.temp;
  const getClothes = temp => {
    if ( temp < 0 ) {
      return clothes.winter;
    } else if ( temp <= 15 ) {
      return clothes.fall;
    } else if ( temp <= 35 ) {
      return clothes.spring;
    } else {
      return clothes.summer;
    }
  };
  const cloth = getClothes(temp);
  const clothKeys = Object.keys(cloth);
  const clothDisplay = clothKeys.map(key => 
    <div>
      <a href={cloth[key].url}>
        <img className='cloth-img' src={cloth[key].img} />
      </a>
    </div>
  );

  return (
    <div className='clothes-display'>
      {clothDisplay}
    </div>
  )
}