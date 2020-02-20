import PropTypes from 'prop-types';
import React from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import OrderList from '../components/order/OrderList';
import Product from '../models/Product';
import { getUserOrders } from '../api/Order';


class Orders extends React.Component {
  static async getInitialProps() {
    const orderDataList = await getUserOrders();
    debugger;
    return { orderDataList };
  }

  render() {
    // const { orderDataList } = this.props;
    const orderDataList = this.props.orderDataList || [];
    const orderList = orderDataList.map(
      (orderData) => new Product(orderData),
    );
    return (
      <MyLayout>
        <OrderList orders={orderList} />
      </MyLayout>
    );
  }
}

Orders.propTypes = {
  // items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Orders;
