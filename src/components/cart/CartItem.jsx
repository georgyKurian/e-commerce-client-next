/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../redux/actions/cart';
import Rating from '../product/Rating';
import Quantity from '../inputs/Quantity';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.images[0],
    };
  }

  handleQuantityChange = (quantity) => {
    const { id, dispatch } = this.props;
    dispatch(updateCartQuantity(id, quantity));
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

  handleRemoveItem = () => {
    const { id, dispatch } = this.props;
    dispatch(removeFromCart(id));
  }

  render() {
    const { image } = this.state;
    const {
      id, name, avgRating, price, reviewCount, quantity, total,
    } = this.props;
    return (
      <div
        className="relative flex flex-wrap items-center justify-between p-2 mb-2 rounded bg-themeGray-200"
      >
        <div className="flex w-full lg:w-3/5">
          <div className="relative w-24 h-16 overflow-hidden rounded">
            <Link href="/products/[id]" as={`/products/${id}`}>
              <a>
                <img
                  src={image}
                  alt="Product"
                  onMouseEnter={this.handleMouseOver}
                  onMouseLeave={this.handleMouseLeave}
                  className="object-cover h-full"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-start flex-grow pl-2 lg:flex-row lg:justify-between lg:items-center">
            <div className="flex flex-col justify-center flex-grow">
              <Link href="/products/[id]" as={`/products/${id}`}>
                <a className="leading-none text-blue-700">{name}</a>
              </Link>
              <Rating
                rating={avgRating}
                reviewCount={reviewCount}
              />
            </div>
            <div>
              <span className="text-xl font-medium text-orange-600">
                {price}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <form action="">
            <label className="text-sm text-gray-600">
              Qty :
              <Quantity className="w-10 h-10 text-right rounded" value={quantity} onQuantityChange={this.handleQuantityChange} />
            </label>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center hidden lg:block">
          <span className="text-sm text-gray-600">Total :</span>
          <span className="w-10 h-10 text-right">{total}</span>
        </div>
        <div className="flex items-center text-center">
          <button type="button" className="mx-auto text-red-600 cursor-pointer" aria-label="Removes this product from the cart" onClick={this.handleRemoveItem}>
            <img src="/delete-24px.svg" alt="Remove" title="Remove from cart" className="opacity-50 hover:opacity-75" />
          </button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  avgRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  total: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  images: [],
};

export default connect()(CartItem);
