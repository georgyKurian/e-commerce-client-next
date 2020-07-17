import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import Order from '../../models/Order';

const OrderList = ({ orders }) => (
  <div className="inner-wrap section">
    {orders.length > 0 ? (
      orders.map((order) => (
        <OrderCard key={order.getId()} order={order} />
      ))
    ) : (
      <div className="flex justify-center p-6 mx-auto bg-gray-200 border border-gray-300 rounded xl:w-2/3">
        <p>No orders yet!</p>
      </div>
    )}
  </div>
);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.instanceOf(Order)).isRequired,
};

export default OrderList;
