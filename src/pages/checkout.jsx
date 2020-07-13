import {
  useEffect, useState, useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import MyLayout from '../components/Layouts/MyLayout';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import { startCheckout, updateCheckoutBillingAddress } from '../redux/actions/checkout';
import StripePayment from '../components/checkout/StripePayment';
import Step1 from '../components/checkout/step1';
import Cart from '../models/Cart';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutPage = (() => {
  const [isFetchProducts, setIsFetchProducts] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const isLoggedIn = useSelector((state) => state.auth?.user?.isLoggedIn);
  const checkout = useSelector((state) => state.checkout);
  const { items, lastUpdated } = useSelector((state) => state.cart);
  const productList = useSelector((state) => state.products.getId);
  const productIdList = useSelector((state) => state.products.getAllIds);
  const dispatch = useDispatch();
  const router = useRouter();

  const cartObject = useMemo(
    () => new Cart(items, productList, productIdList),
    [items, productList, productIdList],
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isFetchProducts) {
      dispatch(fetchProductsIfNeeded());
      setIsFetchProducts(true);
    }
  }, [isFetchProducts]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(startCheckout());
    }
  }, [isLoggedIn, lastUpdated]);

  const handleStep1Submit = async (billingAddress) => {
    await dispatch(updateCheckoutBillingAddress(billingAddress));
    setCurrentStep(2);
  };

  if (items.length > 0) {
    return (
      <MyLayout title="Cart">
        <div className="inner-wrap">
          <div className="w-full">
            <div className="flex justify-between w-full px-4 py-4 border-b border-gray-200 items-ceter">
              <span className="inline-block text-2xl">Checkout</span>
              <div className="flex items-end inline-block">
                <span className="font-semibold">{`Show Order Summary: $${cartObject.getTotalAmount() / 100} (${cartObject.getTotalQuantity()} items)`}</span>
              </div>
            </div>
          </div>

          {currentStep === 1
          && (
          <Step1
            onSubmit={handleStep1Submit}
            billingAddress={checkout.order?.billingAddress}
          />
          )}

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
        </div>
      </MyLayout>
    );
  }

  return (
    <MyLayout title="Cart">
      <p>Your cart is empty. Add some awesome products!</p>
    </MyLayout>
  );
});

export default CheckoutPage;
