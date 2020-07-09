import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../Button';
import Product from '../../models/Product';
import ImageCarosule from './Carousel';
import { addToCart } from '../../redux/actions/cart';

const ProductView = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(product.getId()));
  };

  return (
    <div className="flex flex-wrap py-2 ProductView">
      <ImageCarosule
        images={product.getImages()}
        className="md:w-1/2 md:px-2"
      />
      <div className="md:w-1/2 md:px-2">
        <h2>{product.getName()}</h2>
        <p>{product.getFormattedPrice()}</p>
        <PrimaryButton onClick={addToCartHandle}>Add to Cart</PrimaryButton>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductView;
