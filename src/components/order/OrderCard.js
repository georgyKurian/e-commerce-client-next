import React from 'react';
import PropTypes from 'prop-types';
import Order from '../../models/Order';
import OrderItem from './OrderItem';

const OrderCard = ({ order }) => (
  <div className="OrderSummary mb-10">
    <div className="flex justify-between px-5 py-3 bg-gray-200 border border-gray-400">
      <div>
        <div className="font-semibold">Order Placed</div>
        <div>{order.getDate()}</div>
      </div>
      <div>
        <div className="font-semibold">Order Number</div>
        <div>{order.getId()}</div>
      </div>
      <div>
        <div className="font-semibold">Total Price</div>
        <div>{order.getFormattedTotalPrice()}</div>
      </div>
    </div>
    <div className="px-5 py-3 bg-gray-200 border border-gray-400">
      <table className="OrderSummaryProducts">
        <tbody>
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
        </tbody>
      </table>
    </div>
  </div>
);

OrderCard.propTypes = {
  order: PropTypes.instanceOf(Order).isRequired,
};

export default OrderCard;
