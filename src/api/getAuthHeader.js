import localStore from 'store2';

const getHeader = (token = null) => {
  let currentToken = token;
  if (!currentToken) {
    const auth = localStore.get('auth');
    if (auth && auth.token) currentToken = auth.token;
  }
  return {
    authorization: `Bearer ${currentToken}`,
    'Content-Type': 'application/json' 
  };
};

export default getHeader;
