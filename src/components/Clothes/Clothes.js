import './Clothes.css';
import clothes from '../../clothData';
import { v4 as uuidv4 } from "uuid";
import SlideBar from '../SlideBar/SlideBar';

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
  const clothDisplay = clothKeys.map(key => (
    {
      key: uuidv4(),
      content: (
        <div className='cloth-card'>
          {/* <a href={cloth[key].url}> */}
            <img className='cloth-img' src={cloth[key].img} />
            <div className='middle'>
              <button>hihihihi</button>
            </div>
          {/* </a> */}
        </div>
      )
    }
  )
  );

  return (
    <SlideBar
      cards={clothDisplay}
      height="500px"
      width="30%"
      margin="0 auto"
      offset={2}
      showArrows={false}
    />
  )
}