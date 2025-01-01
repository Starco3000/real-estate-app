import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderInPost.css';

function SliderInPost({ images }) {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={`thumbnail-${i}`} className='custom-dot' />
        </a>
      );
    },
    appendDots: (dots) => (
      <div style={{ marginTop: '30px' }}>
        <ul style={{ paddingTop: '5px' }}> {dots} </ul>
      </div>
    ),
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots slick-thumb custom-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='w-full lg:h-[500px] relative'>
            <div className='w-full h-full blur absolute -z-10'>
              <img
                src={image}
                alt={`slide-${index}`}
                className='w-full h-full object-fill rounded-md '
              />
            </div>
            <div className='w-full h-full bg-transparent absolute'>
              <img
                src={image}
                alt={`slide-${index}`}
                className='w-full h-full object-scale-down rounded-md '
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderInPost;
