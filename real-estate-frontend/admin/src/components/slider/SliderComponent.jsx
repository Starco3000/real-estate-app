import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

function SliderComponent({ children }) {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };
  var settings = {
    infinite: true,
    dots: false,
    arrows: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '-5px',
          infinite: false,
        },
      },
    ],
  };
  return (
    <div className='slider-container md:px-1 md:py-3 relative '>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>

      {/* Custom btn Prev & Next */}
      <div className='w-full flex justify-between absolute top-1/2 transform -translate-y-1/2'>
        <div className='w-full flex flex-row justify-between items-center relative'>
          <button
            className='button w-10 h-10 bg-footer opacity-70 border-[1px] shadow-2xl rounded-full absolute -left-2 z-10'
            style={{ pointerEvents: 'auto' }}
            onClick={previous}
          >
            <FaChevronLeft className='ml-3' />
          </button>
          <button
            className='button w-10 h-10 bg-footer opacity-70 border-[1px] shadow-2xl rounded-full absolute -right-2 z-10'
            style={{ pointerEvents: 'auto' }}
            onClick={next}
          >
            <FaChevronRight className='ml-3' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
