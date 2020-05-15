import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import MyLayout from '../../components/Layouts/MyLayout';
import OrderItem from '../../components/checkout/OrderItem';
import Product from '../../models/Product';
import { fetchProductsIfNeeded } from '../../redux/actions/products';
import AddressFields from '../../components/checkout/AddressFields';
import { PrimaryButton } from '../../components/Button';
import Form from '../../components/Form';
import getPaymentIntent from '../../api/Payment';
import StripePayment from '../../components/checkout/StripePayment';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_RfZ1PvFjLuWOvHitWXLyQuHg00t9NwKTCK');

const PaymentSuccessfull = (({ cart: items, dispatch }) => (
  <MyLayout title="Cart">
    <p>Order is successfull!</p>
  </MyLayout>
));


PaymentSuccessfull.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    quantity: PropTypes.number,
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
  return { cart: newCart };
})(PaymentSuccessfull);
