import {
  CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import Proptypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../Button';
import Form from '../Form';
import { checkoutComplete } from '../../redux/actions/checkout';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#000',
      backgroundColor: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#cdcdcd' },
    },
    invalid: {
      iconColor: '#e53e3e',
      color: '#e53e3e',
    },
  },
  hidePostalCode: false,
};


const StripePayment = ({ clientSecret }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const billingAddress = useSelector((state) => state.checkout.order?.billingAddress);
  const userEmail = useSelector((state) => state.auth?.user?.email);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const paymentHandleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    setIsLoading(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              line1: billingAddress.addressLine1,
              line2: billingAddress.addressLin2,
              city: billingAddress.city,
              state: billingAddress.province,
              country: billingAddress.country,
              postal_code: billingAddress.postalCode,
            },
            email: userEmail,
          },
        },
        receipt_email: userEmail,
      })
      .then(({ paymentIntent, error }) => {
        // Handle result.error or result.paymentIntent
        if (paymentIntent) {
          dispatch(checkoutComplete);
          // router.push('/payment/successfull');
        } else {
          setCardError(error.message);
          setIsLoading(false);
        }
      });
  };

  const handleChange = ({ error }) => {
    if (error) {
      setCardError(error.message);
    } else {
      setCardError('');
    }
  };

  return (
    <Form onSubmit={paymentHandleSubmit}>
      <h2>Payment</h2>
      <CardElement options={CARD_OPTIONS} onChange={handleChange} />
      {cardError !== '' ? <span className="error">{cardError}</span> : ''}
      <PrimaryButton type="submit" className="w-full mt-4" disabled={!stripe && clientSecret}>
        <ClipLoader
          size="16px"
          color="#fff"
          loading={isLoading}
        />
&nbsp;Pay
      </PrimaryButton>
    </Form>
  );
};

StripePayment.propTypes = Proptypes.string;

export default StripePayment;
