import fetch from 'isomorphic-unfetch';

const baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const defaultHeader = { 'Content-Type': 'application/json' };
const defaultOption = {
};

export default (url, { headers, params, ...otherOptions }) => {
  let qs = null;
  if (params) {
    qs = `?${Object.keys(params)
      .filter((key) => params[key])
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')}`;
  }
  return fetch(
    baseURL + url + (qs || ''),
    { ...defaultOption, headers: ({ ...defaultHeader, ...headers }), ...otherOptions },
  )
    .then((r) => {
      if (r.ok) return r.json();
      return [];
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getResponse = (url, { headers, ...otherOptions }) => fetch(
  baseURL + url,
  { ...defaultOption, headers: ({ ...defaultHeader, ...headers }), ...otherOptions },
)
  .catch((err) => {
    console.error(err);
  });
