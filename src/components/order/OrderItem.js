/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { addToCart } from '../../redux/actions/cart';

class OrderItem extends Component {
  handleAddToBag = async () => {
    const { id, dispatch } = this.props;
    dispatch(addToCart(id));
  }

  render() {
    const {
      id, name, price, quantity, subtotal,
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
        <td className="px-5">{`${subtotal}`}</td>
      </tr>
    );
  }
}

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  subtotal: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

OrderItem.defaultProps = {
};

export default OrderItem;
