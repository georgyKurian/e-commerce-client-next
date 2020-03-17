/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SecondaryButton } from '../Button';
import Rating from '../product/Rating';
import { addToCart } from '../../redux/actions/cart';

class CartItem extends Component {
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
    const { image } = this.state;
    const {
      id, name, avgRating, price, reviewCount, quantity, total,
    } = this.props;
    return (
      <div
        className="flex flex-wrap relative flex-wrap justify-between items-center rounded bg-themeGray-200 p-2 mb-2"
      >
        <div className="relative rounded overflow-hidden h-16 w-24">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a>
              <img
                src={image}
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
        </div>
        <div>
          <span className="text-orange-600 font-medium text-xl">
            {price}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <form action="">
            <label htmlFor="quantity" className="text-gray-600 text-sm">
              Qty
              <input className="w-10 h-10 text-right rounded" type="number" name="quantity" value={quantity} />
            </label>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-gray-600 text-sm">Total</span>
          <span className="w-10 h-10 text-right rounded">{total}</span>
        </div>
        <div className="text-center flex items-center">
          <SecondaryButton className="mx-auto">
            Remove
          </SecondaryButton>
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

export default CartItem;
