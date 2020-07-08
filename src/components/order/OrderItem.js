/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const OrderItem = ({
  id, name, images, price, quantity,
}) => (
  <tr
    className="p-2 border-t border-b border-gray-400"
  >
    <td className="p-1">
      <img src={images[0]} alt={name} className="w-12 h-12 rounded" />
    </td>
    <td className="pl-1 pr-5">
      <div>
        <Link href="/products/[id]" as={`/products/${id}`}>
          <a>
            {name}
          </a>
        </Link>
        {quantity > 1
            && (
            <span className="text-gray-600">
              &nbsp;(
              {'x'}
              {quantity}
              )
            </span>
            )}
      </div>
      <div className="text-red-800">{price}</div>
    </td>
  </tr>
);

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

OrderItem.defaultProps = {
};

export default OrderItem;
