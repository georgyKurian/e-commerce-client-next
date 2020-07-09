import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../Button';
import Product from '../../models/Product';
import ImageCarosule from './Carousel';
import { addToCart } from '../../redux/actions/cart';
import Quantity from '../inputs/Quantity';

const ProductView = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(product.getId(), quantity));
    setQuantity(1);
  };

  return (
    <div className="flex flex-wrap py-2 ProductView">
      <ImageCarosule
        images={product.getImages()}
        className="md:w-1/2 md:px-2"
      />
      <div className="md:w-1/2 md:px-2">
        <h1>{product.getName()}</h1>
        <div>
          Price:
          {product.getFormattedPrice()}
        </div>
        <div>
          <Quantity className="w-20 px-4 py-2 mr-2 border border-gray-500 rounded-lg appearance-none customDropDown" value={quantity} onQuantityChange={setQuantity} />
          <PrimaryButton onClick={addToCartHandle}>Add to Cart</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductView;
