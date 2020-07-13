import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import Order from '../../models/Order';

const OrderList = ({ orders }) => (
  <div className="inner-wrap">
    {orders.length > 0 ? (
      orders.map((order) => (
        <OrderCard key={order.getId()} order={order} />
      ))
    ) : (
      <p>No orders yet!</p>
    )}
  </div>
);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.instanceOf(Order)).isRequired,
};

export default OrderList;
