/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import FeaturedTag from './FeaturedTag';
import Rating from './Rating';
import { addToCart } from '../../redux/actions/cart';
import AddSvgIcon from '../../../public/add.svg';

const ProductCard = ({
  id, name, images, isFeatured, avgRating, price, reviewCount,
}) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    if (images.length > 1) {
      setCurrentImage(images[1]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(images[0]);
  };

  const handleAddToBag = async () => {
    dispatch(addToCart(id));
  };

  return (
    <div
      className="relative flex flex-col flex-wrap justify-between overflow-hidden border border-transparent rounded hover:border-gray-200"
    >
      <div className="relative overflow-hidden rounded">
        <Link href="/products/[id]" as={`/products/${id}`}>
          <a>
            <img
              src={currentImage}
              alt="Product"
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
            {isFeatured && <FeaturedTag className="absolute top-0 right-0 mx-1" />}
          </a>
        </Link>
        <button title="Add to Bag" type="button" className="absolute bottom-0 right-0 float-right w-8 h-8 p-1 m-2 text-base border border-white rounded opacity-75 hover:opacity-100" onClick={handleAddToBag}>
          <AddSvgIcon className="mx-auto text-white fill-current" />
        </button>
      </div>
      <div className="flex justify-between px-2">
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="block text-gray-700">{name}</a>
          </Link>
          <Rating
            rating={avgRating}
            reviewCount={reviewCount}
          />
        </div>
        <span className="font-medium text-gray-800">
          {price}
        </span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  avgRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};

ProductCard.defaultProps = {
  images: [],
};

export default connect()(ProductCard);
