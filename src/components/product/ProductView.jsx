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

const ProductView = ({ product, reviewsList, rating }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const features1 = [];
  const features2 = [];

  const addToCartHandle = () => {
    dispatch(addToCart(product.getId(), quantity));
    setQuantity(1);
  };

  
  return (
    <div className="flex flex-wrap ProductView">
      <div className="md:w-3/4 overflow-hidden">
        <section>
          <ImageCarosule
            images={product.getImages()}
            className=""
          />
        </section>
        
        <nav className="border-t border-b h-16 mb-16">
          <ul className="flex justify-center items-center h-full inner-wrap">
             <li>test</li>
          </ul>
        </nav>
        
        <div className="inner-wrap px-24">
          <section className="section flex items-center overflow-hidden">
            <div class="w-1/2 pr-4">
              <h5 className="font-semibold uppercase text-3xl">{product?.productDescription?.title}</h5>
              <h5 className="font-light uppercase text-2xl italic leading-tight">{product?.productDescription?.subtitle}</h5>
              <p>{product?.productDescription?.text}</p>
            </div>
            <div class="w-1/2 pl-4">
              <img src={product.images[0]} alt="" />
            </div>
          </section>
          
          <section className="section overflow-hidden">
            <h5 className="w-full font-semibold uppercase text-3xl">Specifications</h5>
            <div className="w-full flex flex-wrap">
              <Features featureList={product.productDescription.features} />
            </div>
          </section>

          <section className="section overflow-hidden">
            <div className="pb-2 border-b md:pr-8 md:w-1/3 md:float-left md:border-0">
              <h2 className="text-2xl">Customer reviews</h2>
              <Rating  />
            </div>
            <div className="md:pl-8 md:w-2/3 md:float-left">
              <ReviewList reviews={reviewsList} />
            </div>
          </section>
        </div>
        
      </div>
      

      <section className="flex-1 border-l border-themeGray-default md:p-6">
        <div className="sticky top-0">
          <h1>{product.getName()}</h1>
          <div className="font-semibold text-lg mb-4">{product.getFormattedPrice()}</div>
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

const Features = ({featureList}) => {
  const midSize = Math.floor(featureList.length/2);
  const featureElements = [[],[]];

  featureList.forEach((feature,index) => {  
    const featureElementsIndex = (index <= midSize) ? 0 : 1;
    featureElements[featureElementsIndex].push(<li className="mb-4">{feature}</li>);
  });
  
  return (
    <>
      <ul className="flex-1 list-disc ml-4">
        {featureElements[0]}
      </ul>
      <ul className="flex-1 list-disc ml-4">
        {featureElements[1]}
      </ul>      
    </>
  );
};

export default ProductView;
