import getAuthHeader from './getAuthHeader';
import fetch, { getResponse } from './fetch';

const createOrder = (items) => {
  const authHeadder = getAuthHeader();
  return getResponse('/v1/orders', {
    method: 'POST',
    headers: authHeadder,
    body: JSON.stringify({ items }),
  }).then(async (response) => ({
    success: true,
    data: await response.json(),
  }));
};

const updateOrderItems = (orderId, items) => {
  const authHeadder = getAuthHeader();
  return fetch(`/v1/orders/${orderId}`, {
    method: 'PUT',
    headers: authHeadder,
    body: JSON.stringify({ items }),
  }).then(async (response) => {
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
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

const updateOrderAddress = (orderId, billingAddress) => {
  const authHeadder = getAuthHeader();
  return getResponse(`/v1/orders/${orderId}`, {
    method: 'PUT',
    headers: authHeadder,
    body: JSON.stringify({ billingAddress }),
  }).then(async (response) => {
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
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
          success: false,
          error: 'An unknown erroroccured. Please, retry again latter.',
        };
    }
  });
};

const updateOrderStatus = (orderId, status = 'Paid') => {
  const authHeadder = getAuthHeader();
  return getResponse(`/v1/orders/${orderId}`, {
    method: 'PUT',
    headers: authHeadder,
    body: JSON.stringify({ status }),
  }).then(async (response) => {
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
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
          success: false,
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

export {
  createOrder, updateOrderItems, updateOrderAddress, updateOrderStatus, getUserOrders,
};
