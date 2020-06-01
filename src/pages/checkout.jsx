
import { useEffect, useState, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Router from 'next/router';
import MyLayout from '../components/Layouts/MyLayout';
import Product from '../models/Product';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import { startCheckout } from '../redux/actions/checkout';
import StripePayment from '../components/checkout/StripePayment';
import Step1 from '../components/checkout/step1';
import { UserContext } from '../context/UserContext';
import Cart from '../models/Cart';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_RfZ1PvFjLuWOvHitWXLyQuHg00t9NwKTCK');

const CheckoutPage = (({ cart: { items, lastUpdated }, checkout, dispatch }) => {
  const [isFetchProducts, setIsFetchProducts] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const user = useContext(UserContext);

  const cartObject = new Cart(items);

  if (!user?.isLoggedIn) Router.push('/login');

  function handleStepChange(step) {
    setCurrentStep(step + 1);
  }

  useEffect(() => {
    if (isFetchProducts) {
      dispatch(fetchProductsIfNeeded());
      setIsFetchProducts(true);
    }
  }, [isFetchProducts]);

  useEffect(() => {
    dispatch(startCheckout());
  }, [lastUpdated]);

  if (items.length > 0) {
    return (
      <MyLayout title="Cart">
        <>
          <div className="w-full">
            <div className="flex justify-between w-full px-4 py-4 border-b border-gray-200 items-ceter">
              <span className="inline-block text-2xl">Checkout</span>
              <div className="flex items-end inline-block">
                <span className="font-semibold">{`Show Order Summary: $${cartObject.getTotalAmount() / 100} (${cartObject.getTotalQuantity()} items)`}</span>
              </div>
            </div>

          </div>

          {currentStep === 1 && <Step1 stepChange={handleStepChange} />}

          {currentStep === 2
          && (
          <div className="block p-2 mb-2 overflow-hidden bg-gray-200 lg:px-4 lg:py-6">
            {checkout?.paymentIntentSecret ? (
              <Elements stripe={stripePromise}>
                <StripePayment clientSecret={checkout.paymentIntentSecret} />
              </Elements>
            ) : (
              <div>
                <span>
                  Sorry! We are experiencing some problem with payment system.
                  Try after some time
                </span>
              </div>
            )}
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
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.string,
      quantity: PropTypes.number,
    })).isRequired,
    lastUpdated: PropTypes.number,
  }).isRequired,
  checkout: PropTypes.shape({
    orderTotal: PropTypes.number,
    paymentIntentSecret: PropTypes.string,
    lastSync: PropTypes.number,
  }),
  dispatch: PropTypes.func.isRequired,
};

CheckoutPage.defaultProps = {
  checkout: {},
};

export default connect(({ products: { getId }, cart, checkout }) => {
  const cartObject  = useMemo=(()=>new Cart(cart.items,getId),[cart.items,getId])  
  return { cart: { items: cartObject.getItems(), lastUpdated: cart.lastUpdated }, checkout };
})(CheckoutPage);
