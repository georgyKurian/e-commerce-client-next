import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/cart/ShoppingCartList';
import Cart from '../models/Cart';
import OrderSummary from '../components/checkout/OrderSummary';


const Checkout = ((cartItems, dispatch) => {
  const cart = new Cart(cartItems);
  return (
    <MyLayout title="checkout">
      <OrderSummary
        numberOfItems={cart.getTotalQuantity()}
        totalAmount={cart.getFormattedTotalAmount()}
      />
    </MyLayout>
  );
});

ShoppingCartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    quantity: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ products: { items: productList }, cart }) => {
  const newCart = cart.map((cartItem) => {
    let foundProduct;
    if (productList) {
      // eslint-disable-next-line no-underscore-dangle
      foundProduct = productList.find((product) => product._id === cartItem.productId);
    }
    return { product: foundProduct, ...cartItem };
  });
  return { cartItems: newCart };
})(Checkout);
