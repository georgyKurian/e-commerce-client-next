import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../Button';
import Product from '../../models/Product';
import ImageCarosule from './Carousel';
import { addToCart } from '../../redux/actions/cart';
import Quantity from '../inputs/Quantity';
import Rating from './Rating';
import ReviewList from './ReviewList';
import Features from './Features';
import SizeSelect from './size/SizeSelect';
import SelectColor from './color/SelectColor';

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
    isStock: true,
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

const ProductView = ({ product, ratingList, reviewsList }) => {
  const [quantity, setQuantity] = useState(1);
  const [sizeSelected, setSize] = useState(null);
  const [colorSelected, setProductColor] = useState(null);

  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(product.getId(), quantity));
    setQuantity(1);
  };

  const handleSizeSelect = (sizeValue) => {
    setSize(sizeValue);
  };

  const handleColorSelect = (colorValue) => {
    setProductColor(colorValue);
  };

  const ratingElementList = [];
  for (let i = 50; i > 0; i -= 10) {
    let percentage = 0;
    let noOfReviews = 0;

    if (ratingList[i]) {
      percentage = ratingList[i].percentage;
      noOfReviews = ratingList[i].noOfReviews;
    }

    ratingElementList.push(
      <div key={i} className="flex items-center mb-2">
        <button className="p-px text-sm underline uppercase hover:bg-black hover:text-white" type="button">
          {i / 10}
          {' Stars'}
        </button>
        <div className="flex-1 px-4">
          <div className="w-full h-1 bg-gray-300">
            <div className="h-1 bg-green-400" style={{ width: `${percentage}%` }} />
          </div>
        </div>
        <span className="text-xs" type="button">{noOfReviews}</span>
      </div>,
    );
  }

  return (
    <article className="flex flex-wrap ProductView">
      <div className="overflow-hidden md:w-3/4">
        <section id="product-gallery">
          <ImageCarosule
            images={product.getImages()}
            className=""
          />
        </section>

        <nav className="h-16 mb-16 border-t border-b">
          <ul className="flex items-center justify-center h-full text-sm uppercase inner-wrap">
            <li><a className="px-2 text-black" href="#product-gallery">Gallery</a></li>
            <li><a className="px-2 text-black" href="#product-description">Description</a></li>
            <li><a className="px-2 text-black" href="#product-features">Features</a></li>
            <li><a className="px-2 text-black" href="#product-reviews">Reviews</a></li>
          </ul>
        </nav>

        <div className="px-8 xl:px-40">
          <section id="product-description" className="flex flex-wrap items-center overflow-hidden section">
            <div className="pr-4 md:w-1/2">
              <h5 className="text-3xl font-semibold uppercase">{product?.productDescription?.title}</h5>
              <h5 className="text-2xl italic font-light leading-tight uppercase">{product?.productDescription?.subtitle}</h5>
              <p>{product?.productDescription?.text}</p>
            </div>
            <div className="w-1/2 pl-4">
              <img src={product.images[0]} alt="" />
            </div>
          </section>

          <section id="product-features" className="overflow-hidden section">
            <h4 className="w-full text-3xl font-semibold uppercase">Specifications</h4>
            <div className="flex flex-wrap w-full">
              <Features featureList={product.productDescription.features} />
            </div>
          </section>

          <section id="product-reviews" className="overflow-hidden section">
            <h4 className="w-full text-3xl font-semibold uppercase">Ratings & reviews</h4>

            <div className="pb-2 border-b md:pr-5 md:w-1/3 md:float-left md:border-0">
              <section className="flex items-center px-8 py-2 mb-5 bg-green-400">
                <div className="mr-2 text-6xl font-semibold">{product.getAvgRatingFormatted()}</div>
                <div className="ml-2">
                  <Rating rating={product.getAvgRating()} />
                  <div>
                    <span className="font-semibold">{product.getReviewCount()}</span>
                    <span> Reviews</span>
                  </div>
                </div>
              </section>

              <section className="">
                <h5 className="mb-2 uppercase">Rating breakdown</h5>
                {ratingElementList}
              </section>
            </div>

            <section className="md:pl-5 md:w-2/3 md:float-left">
              <ReviewList reviews={reviewsList} />
            </section>
          </section>
        </div>
      </div>

      <section className="flex-1 border-l border-themeGray-default">
        <div className="sticky top-0 md:p-6">
          <h1>{product.getName()}</h1>
          <div className="mb-4 text-lg font-semibold">{product.getFormattedPrice()}</div>
          <section className="mb-4 sizes">
            <h4 className="mb-2">Select Size</h4>
            <SizeSelect
              sizeList={sizeList}
              selectedSize={sizeSelected}
              onSizeSelect={handleSizeSelect}
            />
          </section>
          <section className="mb-4 colors">
            <h4 className="mb-2">Select Color</h4>
            <SelectColor
              colourList={colorList}
              selectedColor={colorSelected}
              onChange={handleColorSelect}
            />
          </section>
          <div>
            <Quantity className="w-20 px-4 py-2 mr-2 border border-gray-500 appearance-none customDropDown" value={quantity} onQuantityChange={setQuantity} />
            <PrimaryButton onClick={addToCartHandle}>Add to Cart</PrimaryButton>
          </div>
        </div>
      </section>
    </article>
  );
};

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductView;
