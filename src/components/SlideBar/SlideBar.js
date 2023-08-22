import './SlideBar.css';
import Carousel from "react-spring-3d-carousel";
import { useState } from "react";
import { config } from "react-spring";
import PropTypes from 'prop-types';

export default function SlideBar({clothes}) {
  const table = clothes.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius] = useState(2);
  const [showArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  return (
    <div className='slide-bar'>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  )
}

SlideBar.propTypes = {
  clothes: PropTypes.array,
}
