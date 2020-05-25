import getAuthHeader from './getAuthHeader';
import fetch from './fetch';

const createOrder = async (items) => {
  const authHeadder = await getAuthHeader();
  return fetch('/v1/orders', {
    method: 'POST',
    headers: authHeadder,
    items,
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
          error: 'An unknown error occured. Please, retry again latter.',
        };
    }
  });
};

const updateOrder = async (orderId, items) => {
  const authHeadder = await getAuthHeader();
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
