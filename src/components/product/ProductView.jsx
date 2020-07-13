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

const ProductView = ({ product, reviewsList }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(product.getId(), quantity));
    setQuantity(1);
  };

  return (
    <div className="flex flex-wrap ProductView">
      <div className="overflow-hidden md:w-3/4">
        <section>
          <ImageCarosule
            images={product.getImages()}
            className=""
          />
        </section>

        <nav className="h-16 mb-16 border-t border-b">
          <ul className="flex items-center justify-center h-full inner-wrap">
            <li>test</li>
          </ul>
        </nav>

        <div className="px-24 inner-wrap">
          <section className="flex items-center overflow-hidden section">
            <div className="w-1/2 pr-4">
              <h5 className="text-3xl font-semibold uppercase">{product?.productDescription?.title}</h5>
              <h5 className="text-2xl italic font-light leading-tight uppercase">{product?.productDescription?.subtitle}</h5>
              <p>{product?.productDescription?.text}</p>
            </div>
            <div className="w-1/2 pl-4">
              <img src={product.images[0]} alt="" />
            </div>
          </section>

          <section className="overflow-hidden section">
            <h4 className="w-full text-3xl font-semibold uppercase">Specifications</h4>
            <div className="flex flex-wrap w-full">
              <Features featureList={product.productDescription.features} />
            </div>
          </section>

          <section className="overflow-hidden section">
            <h4 className="w-full text-3xl font-semibold uppercase">Ratings & reviews</h4>

            <div className="pb-2 border-b md:pr-5 md:w-1/3 md:float-left md:border-0">
              <div className="flex items-center px-8 py-2 mb-5 bg-green-400">
                <div className="mr-2 text-6xl font-semibold">5.0</div>
                <div className="ml-2">
                  <Rating rating={50} />
                  <div>
                    <span className="font-semibold">{5}</span>
                    <span> Reviews</span>
                  </div>
                </div>
              </div>

              <div className="">
                <h5 className="mb-2 uppercase">Rating breakdown</h5>
                <div className="flex items-center mb-2">
                  <button className="p-px text-sm underline uppercase hover:bg-black hover:text-white" type="button">5 Stars</button>
                  <div className="flex-1 px-4">
                    <div className="w-full h-1 bg-gray-300">
                      <div className="w-full h-1 bg-green-400" />
                    </div>
                  </div>
                  <span className="text-xs" type="button">4588</span>
                </div>
              </div>
            </div>

            <div className="md:pl-5 md:w-2/3 md:float-left">
              <ReviewList reviews={reviewsList} />
            </div>
          </section>
        </div>

      </div>

      <section className="flex-1 border-l border-themeGray-default md:p-6">
        <div className="sticky top-0">
          <h1>{product.getName()}</h1>
          <div className="mb-4 text-lg font-semibold">{product.getFormattedPrice()}</div>
          <div>
            <Quantity className="w-20 px-4 py-2 mr-2 border border-gray-500 appearance-none customDropDown" value={quantity} onQuantityChange={setQuantity} />
            <PrimaryButton onClick={addToCartHandle}>Add to Cart</PrimaryButton>
          </div>
        </div>
      </section>
    </div>

  );
};

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

const Features = ({ featureList }) => {
  const midSize = Math.floor(featureList.length / 2);
  const featureElements = [[], []];

  featureList.forEach((feature, index) => {
    const featureElementsIndex = (index <= midSize) ? 0 : 1;
    featureElements[featureElementsIndex].push(<li className="mb-4">{feature}</li>);
  });

  return (
    <>
      <ul className="flex-1 ml-4 list-disc">
        {featureElements[0]}
      </ul>
      <ul className="flex-1 ml-4 list-disc">
        {featureElements[1]}
      </ul>
    </>
  );
};

export default ProductView;
