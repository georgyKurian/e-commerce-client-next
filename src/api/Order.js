import getAuthHeader from './getAuthHeader';
import { getResponse } from './fetch';

const createOrder = (items) => {
  const authHeadder = getAuthHeader();
  return getResponse('/v1/orders', {
    method: 'POST',
    headers: authHeadder,
    body: JSON.stringify({ items }),
  }).then(async(response) => ({
    success: true,
    data: await response.json(),
  }));
};

const updateOrder =  (orderId, items) => {
  const authHeadder = getAuthHeader();
  return fetch('/v1/orders', {
    method: 'POST',
    headers: authHeadder,
    body: { orderId, items },
  }).then((response) => {
    if (response.ok) {
      return {
        success: true,
        data: response.json(),
      };
    }
    switch (response.status) {
      case 400:
        return {
          success: false,
          error:
              "We coudn't setup the order for you. Please check your contact and shipping details.",
        };
      case 401:
        return {
          success: false,
          error:
              'Placing the order failed because your session expired. Please, refresh the page and try agaian.',
        };
      default:
        return {
          error: 'An unknown erroroccured. Please, retry again latter.',
        };
    }
  });
};

const getUserOrders = async () => {
  const authHeadder = await getAuthHeader();
  return fetch('/v1/orders', {
    method: 'GET',
    headers: authHeadder,
  });
};

export { createOrder, updateOrder, getUserOrders };
