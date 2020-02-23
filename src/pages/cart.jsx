import PropTypes from 'prop-types';
import React from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/ShoppingCartList';


class Cart extends React.Component {
  static async getInitialProps({ store }) {
    // await store.dispatch(fetchProductsIfNeeded());
  }

  render() {
    return (
      <MyLayout>
        <ShoppingCartList />
      </MyLayout>
    );
  }
}

export default Cart;
