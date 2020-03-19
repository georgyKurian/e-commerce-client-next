import React from 'react';
import { connect } from 'react-redux';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/cart/ShoppingCartList';


class Cart extends React.Component {
  static async getInitialProps() {
    //
  }

  render() {
    return (
      <MyLayout>
        <ShoppingCartList />
      </MyLayout>
    );
  }
}

export default connect(({ cart }) => ({ cart }))(Cart);
