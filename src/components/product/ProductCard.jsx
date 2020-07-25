import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FeaturedTag from './FeaturedTag';
import { addToCart } from '../../redux/actions/cart';
import AddSvgIcon from '../../../public/add.svg';
import Product from '../../models/Product';

const ProductCard = ({ product }) => {
  const images = product.getImages();
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isHover, setHover] = useState(false);
  const dispatch = useDispatch();
  const isFeatured = false;

  const id = product.getId();
  const name = product.getName();
  const category = product.getCategory();
  const price = product.getFormattedPrice();

  const handleMouseOver = () => {
    setHover(true);
    if (images.length > 1) {
      setCurrentImage(images[1]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(images[0]);
    setHover(false);
  };

  const handleAddToBag = async () => {
    dispatch(addToCart(id));
  };

  if (product) {
    return (
      <article
        className={`productCard ${isHover && 'is-active'}`}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseOver}
        onBlur={handleMouseLeave}
      >
        <div className="relative w-full overflow-hidden bg-gray-200 rounded" style={{ paddingTop: '100%' }}>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a
              title={name}
            >
              <img
                className={`absolute inset-0 w-full ${currentImage !== images[0] && 'hidden'}`}
                src={images[0]}
                alt="Product"
              />
              <img
                loading="lazy"
                className={`absolute inset-0 w-full ${currentImage !== images[1] && 'hidden'}`}
                src={images[1]}
                alt="Product"
              />
              <div
                className="absolute inset-0 bg-green-400 image-overlay "
              />
              {isFeatured && <FeaturedTag className="absolute top-0 right-0 mx-1" />}
            </a>
          </Link>
          <button title="Add to Bag" type="button" className="absolute bottom-0 right-0 float-right p-1 m-2 text-base border border-white rounded opacity-75 hover:opacity-100" onClick={handleAddToBag}>
            <AddSvgIcon className="w-8 h-8 mx-auto text-white fill-current" />
          </button>
        </div>
        <div className="w-full h-32 p-3 " />
        <div className="container-info">
          <div className="flex justify-between h-32 p-3">
            <div>
              <div className="mb-2 text-xs text-gray-600">{category}</div>
              <Link href="/products/[id]" as={`/products/${id}`}>
                <a className="block text-sm text-gray-600 uppercase">{name}</a>
              </Link>
              <span className="block text-sm text-gray-600 uppercase">
                {price}
              </span>
            </div>
            <span className="hidden font-medium text-gray-800">
              {price}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      className="relative flex flex-col flex-wrap justify-between flex-1 overflow-hidden border border-transparent hover:border-black"
    >

      <div className="w-full">
        <div className="w-full mb-2 text-xs bg-gray-500 image" style={{ paddingTop: '100%' }} />
        <div className="w-16 h-4 mb-2 text-xs bg-gray-500" />
        <div className="w-32 h-4 mb-2 text-xs bg-gray-500" />
        <span className="block w-12 h-4 uppercase bg-gray-500" />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Product),
};

ProductCard.defaultProps = {
  product: null,
};

export default ProductCard;
