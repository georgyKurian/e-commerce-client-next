import fetch from './fetch';

export const getProducts = async (categories) => fetch(`/v1/products${categories ? `?categories=${categories}` : ''}`, {
  method: 'GET',
});

export const getProductDetails = async (id) => fetch(`/v1/products${id ? `/${id}` : ''}`, {
  method: 'GET',
});
