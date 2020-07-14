import PropTypes from 'prop-types';
import React from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import OrderList from '../components/order/OrderList';
import Order from '../models/Order';
import { getUserOrders } from '../api/Order';

class Orders extends React.Component {
  static async getInitialProps() {
    const orderDataList = await getUserOrders();
    return { orderDataList };
  }

  render() {
    const { orderDataList } = this.props;
    const orderList = orderDataList.map(
      (orderData) => new Order(orderData),
    );
    return (
      <MyLayout title="My Orders">
        <OrderList orders={orderList} />
      </MyLayout>
    );
  }
}

Orders.propTypes = {
  orderDataList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Orders;
