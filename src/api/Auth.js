import fetch from './fetch';
import getAuthHeader from './getAuthHeader';

export const getCurrentUser = async (token = null) => fetch('/v1/auth/', {
  method: 'POST',
  headers: await getAuthHeader(token),
});
