import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FeaturedTag from './FeaturedTag';
import { addToCart } from '../../redux/actions/cart';
import AddSvgIcon from '../../../public/add.svg';
import Product from '../../models/Product';

const colorList = [
  {
    code: '#6e8cd5',
    name: 'Blue',
  },
  {
    code: '#ffffff',
    name: 'White',
  },
  {
    code: '#000000',
    name: 'Black',
  },
];

const sizeList = [
  {
    name: 'x-s',
    isStock: true,
  },
  {
    name: 's',
    isStock: true,
  },
  {
    name: 'm',
    isStock: false,
  },
  {
    name: 'l',
    isStock: true,
  },
  {
    name: 'x-l',
    isStock: true,
  },
  {
    name: 'xx-l',
    isStock: true,
  },
];

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
        <div className="relative w-full">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a
              title={name}
              aria-hidden
              role="presentation"
              tabIndex="-1"
              className="block"
            >
              <div className="relative w-full overflow-hidden bg-gray-200 rounded" style={{ paddingTop: '100%' }}>
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
                  className="absolute inset-0 bg-green-400 image-overlay"
                />
                {isFeatured && <FeaturedTag className="absolute top-0 right-0 mx-1" />}
              </div>
            </a>
          </Link>
          <button
            title="Add to Bag"
            type="button"
            className="absolute flex items-center px-2 py-1 mx-auto text-base font-semibold text-white uppercase border-2 border-white rounded actions"
            onClick={handleAddToBag}
            style={{ top: '40%', left: '50%', transform: 'translate(-50%,-50%)' }}
          >
            <span>Add to cart</span>
            <AddSvgIcon className="w-8 h-8 mx-auto text-white fill-current" />
          </button>

        </div>
        <div className="w-full m-3 main-data-wrapper" />
        <div className="p-3 container-info">
          <div className="flex justify-between mb-3 main-data-wrapper">
            <div>
              <div className="mb-2 text-xs text-gray-600">{category}</div>
              <Link href="/products/[id]" as={`/products/${id}`}>
                <a className="block"><h3 className="mb-0  text-sm font-normal text-gray-600 uppercase">{name}</h3></a>
              </Link>
              <span className="block text-sm text-gray-600 uppercase lg:hidden">
                {price}
              </span>
            </div>
            <span className="hidden text-sm text-gray-600 uppercase lg:block">
              {price}
            </span>
          </div>
          <div className="text-sm text-gray-600 options ">
            <section className="mb-1 colors">
              <h5 className="mb-0 text-sm text-black uppercase">COLORS</h5>
              <div className="flex flex-wrap">
                {colorList.map((colorData) => (
                  <div className="m-1" key={colorData.code}>
                    <span className="block w-4 h-4 border rounded-full" title={colorData.name} style={{ backgroundColor: colorData.code }} />
                    <span className="sr-only">{colorData.name}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="sizes">
              <h5 className="mb-0 text-sm text-black uppercase">Sizes</h5>
              <span>{sizeList.map((size) => size.name).join(', ')}</span>
            </section>
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
