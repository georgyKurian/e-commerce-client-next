import PropTypes from 'prop-types';
import React from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import OrderList from '../components/order/OrderList';
import Order from '../models/Order';
import { getUserOrders } from '../api/Order';


class Checkout extends React.Component {
  static async getInitialProps() {
    const orderDataList = await getUserOrders();
    return { orderDataList };
  }

  render() {
    return (
      <MyLayout title="Checkout">
        <OrderList orders={orderList} />
      </MyLayout>
    );
  }
}

Checkout.propTypes = {
  orderDataList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
