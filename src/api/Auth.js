import fetch from './fetch';
import getAuthHeader from './getAuthHeader';

const getCurrentUser = async (token = null) => fetch('/v1/auth/', {
  method: 'POST',
  headers: await getAuthHeader(token),
});

export default getCurrentUser;
