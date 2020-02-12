import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../Button';
import Product from '../../models/Product';
import ImageCarosule from './Carousel';

export default class ProductView extends Component {
  addToCart = () => {
    this.props.addToCart(this.props.product.getData());
  };

  render() {
    const { product } = this.props;
    return (
      <div className="ProductView flex flex-wrap py-2 ">
        <ImageCarosule
          images={product.getImages()}
          className="md:w-1/2 md:px-2"
        />
        <div className="md:w-1/2 md:px-2">
          <h2>{product.getName()}</h2>
          <p>{product.getFormattedPrice()}</p>
          <PrimaryButton onClick={this.addToCart}>Add to Cart</PrimaryButton>
        </div>
      </div>
    );
  }
}

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
  addToCart: PropTypes.func.isRequired,
};
