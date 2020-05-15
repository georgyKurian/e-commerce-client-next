import {
  CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import Proptypes from 'prop-types';
import { PrimaryButton } from '../Button';
import Form from '../Form';

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
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};


const StripePayment = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

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


    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      })
      .then((result) => {
        // Handle result.error or result.paymentIntent
        if(result.paymentIntent){
          console.log(result.paymentIntent);
          alert("Success!");
        }
        else{
          console.log(error);
          alert("Error");
        }
      });
  };

  return (
    <Form onSubmit={paymentHandleSubmit}>
      <h2>Payment</h2>
      <CardElement options={CARD_OPTIONS} />
      <PrimaryButton type="submit" className="mt-4 w-full" disabled={!stripe && clientSecret}>
        Pay
      </PrimaryButton>
    </Form>
  );
};

StripePayment.propTypes = Proptypes.string;

export default StripePayment;
