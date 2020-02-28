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
      id, name, price, quantity,
    } = this.props;
    return (
      <tr
        className="bg-themeGray-200 p-2 border-t border-b border-gray-400"
      >
        <td className="px-5">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="text-blue-700">{name}</a>
          </Link>
        </td>
        <td className="text-orange-600 font-medium text-xl px-5">{price}</td>
        <td className="px-5">{`Qty : ${quantity}`}</td>
      </tr>
    );
  }
}

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};

OrderItem.defaultProps = {
  images: [],
};

export default OrderItem;
