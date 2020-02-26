/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Rating from '../product/Rating';
import { addToCart } from '../../redux/actions/cart';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.images[0],
    };
  }

  handleMouseOver = () => {
    const { images } = this.props;
    if (images.length > 1) {
      this.setState({
        image: images[1],
      });
    }
  };

  handleMouseLeave = () => {
    this.setState({
      image: this.props.images[0],
    });
  };

  handleAddToBag = async () => {
    const { id, dispatch } = this.props;
    dispatch(addToCart(id));
  }

  render() {
    const {
      id, name, avgRating, price, reviewCount, quantity,
    } = this.props;
    return (
      <div
        className="flex flex-wrap relative flex-wrap justify-between rounded bg-themeGray-200 p-2 mb-2"
      >
        <div className="relative rounded overflow-hidden h-24 w-24">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a>
              <img
                src={this.state.image}
                alt="Product"
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                className="h-full object-cover"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="text-blue-700">{name}</a>
          </Link>
          <Rating
            rating={avgRating}
            reviewCount={reviewCount}
          />
          <span className="text-orange-600 font-medium text-xl">
            {price}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span htmlFor="quantity" className="text-gray-600 text-sm">
            Qty :
            {' '}
            {quantity}
          </span>
        </div>
        <div className="text-center flex items-center" />

      </div>
    );
  }
}

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  avgRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};

OrderItem.defaultProps = {
  images: [],
};

export default OrderItem;
