import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

export default function ImageCarousel({ className, images }) {
  const settings = {
    autoPlay: true,
    autoplaySpeed: 3000,
    showStatus: false,
    className,
    dots: true,
    infiniteLoop: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Carousel {...settings}>
      {images.map((image) => (
        <img src={image} key={image} alt="Product" className="object-contain w-full h-full" />
      ))}
    </Carousel>
  );
}

ImageCarousel.propTypes = {
  className: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

ImageCarousel.defaultProps = {
  className: '',
  images: [],
};
