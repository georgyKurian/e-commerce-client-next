/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../redux/actions/cart';
import Quantity from '../inputs/Quantity';
import CloseIconSvg from '../../../public/close.svg';

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
        className="relative flex mb-6 border-gray-600 lg:border lg:mb-6"
      >
        <div className="flex w-5/12 lg:w-1/3">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="relative block w-full" style={{ paddingTop: '100%' }}>
              <img
                src={image}
                alt="Product"
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                className="absolute top-0 object-cover h-full"
              />
            </a>
          </Link>
        </div>

        <div className="flex flex-col justify-between flex-1 ml-4 lg:ml-8">
          <div className="flex">
            <div className="flex items-start flex-grow pb-2 pr-6 lg:pr-0 lg:py-5 lg:flex-row lg:justify-between lg:items-start">
              <div className="flex flex-col justify-center flex-grow">
                <Link href="/products/[id]" as={`/products/${id}`}>
                  <a className="leading-tight text-gray-700">{name}</a>
                </Link>
              </div>
              <div className="hidden leading-tight lg:block">
                {total}
              </div>
            </div>
            <div className="flex-none -mt-4 -mr-4 md:m-0">
              <button type="button" className="p-5 mx-auto text-black cursor-pointer" aria-label="Removes this product from the cart" onClick={this.handleRemoveItem}>
                <CloseIconSvg role="img" className="w-4 h-4 hover:opacity-50" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between my-5 text-center">
            <div className="leading-tight lg:hidden">
              {total}
            </div>
            <form action="">
              {/* eslint-disable-n dext-line jsx-a11y/label-has-associated-control */}
              <label className="text-sm text-gray-600">
                Qty :
                <Quantity className="w-10 h-10 text-right rounded" value={quantity} onQuantityChange={this.handleQuantityChange} />
              </label>
            </form>
          </div>
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
