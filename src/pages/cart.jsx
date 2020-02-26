import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/cart/ShoppingCartList';
import { PrimaryButton } from '../components/Button';


class Cart extends React.Component {
  static async getInitialProps({ store }) {
    // await store.dispatch(fetchProductsIfNeeded());
  }

  render() {
    return (
      <MyLayout>
        <ShoppingCartList />
        <PrimaryButton className="float-right">Checkout</PrimaryButton>
      </MyLayout>
    );
  }
}

export default connect(({ cart }) => ({ cart }))(Cart);
