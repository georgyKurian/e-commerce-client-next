import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import OrderList from '../components/order/OrderList';
import Order from '../models/Order';
import { getUserOrders } from '../api/Order';

const OrdersPage = () => {
  const [orderDataList, setOrderData] = useState([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      setFetching(true);
      getUserOrders()
        .then((orderList) => {
          setOrderData(orderList);
        })
        .finally(() => { setFetching(false); });
    }
  }, []);

  const orderList = orderDataList.map(
    (orderData) => new Order(orderData),
  );

  return (
    <MyLayout title="My Orders">
      <OrderList orders={orderList} />
    </MyLayout>
  );
};

/* class Orders extends React.Component {
  static async getInitialProps() {
    const orderDataList = await getUserOrders();
    return { orderDataList };
  }

  render() {
    const { orderDataList } = this.props;

    return (
      <MyLayout title="My Orders">
        <OrderList orders={orderList} />
      </MyLayout>
    );
  }
}

Orders.propTypes = {
  orderDataList: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */

export default OrdersPage;
