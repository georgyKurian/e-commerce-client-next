import fetch from './fetch';

export const getProducts = async (filter, pageNumber = 0) => {
  const params = { ...filter, page: pageNumber };

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
