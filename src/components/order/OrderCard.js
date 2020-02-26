import React from 'react';
import PropTypes from 'prop-types';
import Order from '../../models/Order';
import OrderItem from './OrderItem';

const OrderCard = ({ order }) => (
  <div className="OrderSummary">
    <p>
      Order Number:
      {order.getId()}
    </p>
    <div className="OrderSummaryProducts">
      {order.getProducts().map((product, index) => (
        <OrderItem
          // eslint-disable-next-line react/no-array-index-key
          key={`${order.getId()}_${product.getId()}_${index}`}
          name={product.getName()}
          images={product.getImages()}
          price={product.getFormattedPrice()}
          quantity={1}
        />
      ))}
    </div>
    <p>
      Total Price:
      {order.getFormattedTotalPrice()}
    </p>
  </div>
);

OrderCard.propTypes = {
  order: PropTypes.instanceOf(Order).isRequired,
};

export default OrderCard;
