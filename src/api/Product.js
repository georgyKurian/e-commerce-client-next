import fetch from './fetch';

export const getProducts = async (pageNumber = 0, filters = null, sortBy = null) => {
  const params = { ...filters, page: pageNumber, sortBy };

  return fetch(
    '/v1/products', {
      method: 'GET',
      params,
    },
  );
};

export const getProductDetails = async (id) => fetch(`/v1/products${id ? `/${id}` : ''}`, {
  method: 'GET',
});
