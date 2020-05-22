
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyLayout from '../components/Layouts/MyLayout';
import Product from '../models/Product';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import getPaymentIntent from '../api/Payment';
import StripePayment from '../components/checkout/StripePayment';
import Step1 from '../components/checkout/step1';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_RfZ1PvFjLuWOvHitWXLyQuHg00t9NwKTCK');

const CheckoutPage = (({ cart: items, dispatch }) => {
  const [isFetchProducts, setIsFetchProducts] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);


  function handleStepChange(step) {
    setCurrentStep(step + 1);
  }

  useEffect(() => {
    if (!clientSecret) {
      getPaymentIntent(items).then((data) => {
        setClientSecret(data.clientSecret);
      });
    }
    if (isFetchProducts) {
      dispatch(fetchProductsIfNeeded());
      setIsFetchProducts(true);
    }
  });

  const { price: subTotal, quantity: totalQuantity } = items
    .reduce((total, item) => {
      let product = null;
      if (item.product) {
        product = new Product(item.product);
        const price = total.price + product.getSubtotal(item.quantity);
        const quantity = total.quantity + item.quantity;
        return {
          price,
          quantity,
        };
      }
      if (!isFetchProducts) {
        setIsFetchProducts(true);
      }
      return null;
    }, { quantity: 0, price: 0 });
  if (items.length > 0) {
    return (
      <MyLayout title="Cart">
        <>
          <div className="w-full">
            <div className="flex justify-between w-full px-4 py-4 border-b border-gray-200 items-ceter">
              <span className="inline-block text-2xl">Checkout</span>
              <div className="flex items-end inline-block">
                <span className="font-semibold">{`Show Order Summary: $${subTotal / 100} (${totalQuantity} items)`}</span>
              </div>
            </div>

          </div>

          {currentStep === 1 && <Step1 stepChange={handleStepChange} />}

          {currentStep === 2
          && (
          <div className="block p-2 mb-2 overflow-hidden bg-gray-200 lg:px-4 lg:py-6">
            <Elements stripe={stripePromise}>
              <StripePayment clientSecret={clientSecret} />
            </Elements>
          </div>
          )}

        </>
      </MyLayout>
    );
  }

  return (
    <MyLayout title="Cart">
      <p>Your cart is empty. Add some awesome products!</p>
    </MyLayout>
  );
});


CheckoutPage.propTypes = {
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
})(CheckoutPage);
