import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FeaturedTag from './FeaturedTag';
import { addToCart } from '../../redux/actions/cart';
import AddSvgIcon from '../../../public/add.svg';
import Product from '../../models/Product';

const ProductCard = ({
  product, id, name, category, price,
}) => {
  const images = product.getImages();
  const [currentImage, setCurrentImage] = useState(images[0]);
  const dispatch = useDispatch();
  const isFeatured = false;

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

  if (product) {
    return (
      <div
        className="relative flex flex-col flex-wrap justify-between overflow-hidden border border-transparent hover:border-black"
      >
        <div className="relative overflow-hidden rounded">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a title={name}>
              <img
                src={currentImage}
                alt="Product"
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              />
              {isFeatured && <FeaturedTag className="absolute top-0 right-0 mx-1" />}
            </a>
          </Link>
          <button title="Add to Bag" type="button" className="absolute bottom-0 right-0 float-right p-1 m-2 text-base border border-white rounded opacity-75 hover:opacity-100" onClick={handleAddToBag}>
            <AddSvgIcon className="w-8 h-8 mx-auto text-white fill-current" />
          </button>
        </div>
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  product: null,
  images: [],
};

export default ProductCard;
