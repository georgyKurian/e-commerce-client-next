import fetch from './fetch';
import getAuthHeader from './getAuthHeader';

export const getUsers = async () => fetch('/v1/users', {
  method: 'GET',
  headers: await getAuthHeader(),
});

export const getUser = async (id) => {
  fetch(`/v1/users/${id}`, {
    method: 'GET',
    headers: await getAuthHeader(),
  });
};
