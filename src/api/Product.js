import fetch from './fetch';

export const getProducts = async (categories, pageNumber = 0) => {
  const params = { page: pageNumber };
  if (categories) { params[categories] = categories; }

  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return fetch(
    `/v1/products?${qs}`, {
      method: 'GET',
    },
  );
};
export const getProductDetails = async (id) => fetch(`/v1/products${id ? `/${id}` : ''}`, {
  method: 'GET',
});
