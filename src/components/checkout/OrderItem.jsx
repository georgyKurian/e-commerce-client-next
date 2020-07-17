/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OrderItem = ({
  id, name, price, quantity, total,
}) => (
  <div className="table-row">
    <div className="table-cell">
      <Link href="/products/[id]" as={`/products/${id}`}>
        <a className="leading-none text-blue-700">{name}</a>
      </Link>
    </div>
    <div className="table-cell">
      <span className="font-medium">
        {price}
      </span>
    </div>
    <div className="table-cell">
      <span className="text-sm text-gray-600">
        X&nbsp;
        {quantity}
      </span>
    </div>
    <div className="table-cell">
      <span className="w-10 h-10 text-right">{total}</span>
    </div>
  </div>
);

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  total: PropTypes.string.isRequired,
};

export default connect()(OrderItem);
