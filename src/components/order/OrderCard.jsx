import React from 'react';
import PropTypes from 'prop-types';
import Order from '../../models/Order';
import OrderItem from './OrderItem';

const OrderCard = ({ order }) => (
  <div className="mb-10 text-sm border border-gray-400 rounded OrderSummary">
    <div className="flex justify-between px-5 py-3 bg-gray-200">
      <div className="w-3/12 pr-2">
        <div className="text-xs">ORDER PLACED</div>
        <div>{order.getDate()}</div>
      </div>
      <div className="w-2/12 pr-2">
        <div className="text-xs">TOTAL</div>
        <div>{order.getFormattedTotalPrice()}</div>
      </div>
      <div className="w-2/12 pr-2">
        <div className="text-xs">STATUS</div>
        <div className="capitalize">
          <span
            className={`px-1 rounded text-white bg-${order.getStatusColor()}`}
            style={{ paddingTop: '1px', paddingBottom: '3px' }}
          >
            {order.getStatus()}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="float-right text-xs">
          Order #
          {' '}
          {order.getId()}
        </div>
        <div />
      </div>
    </div>
    <div className="px-5 py-3 border-t border-gray-400">
      <table className="OrderSummaryProducts">
        <tbody>
          {order.getProducts().map((product) => (
            <OrderItem
              id={product.getId()}
              key={`${order.getId()}_${product.getId()}`}
              name={product.getName()}
              images={product.getImages()}
              price={product.getFormattedPrice()}
              subtotal={product.getFormattedSubtotal(1)}
              quantity={product.getQuantity()}
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
