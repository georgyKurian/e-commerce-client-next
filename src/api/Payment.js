import fetch from './fetch';

const getPaymentIntent = async (cart) => fetch('/v1/create-payment-intent', {
  method: 'POST',
  body: JSON.stringify({ cart }),
});

export default getPaymentIntent;
