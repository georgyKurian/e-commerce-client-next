import localStore from 'store2';

const getHeader = async (token = null) => {
  let currentToken = token;
  if (!currentToken) {
    const auth = await localStore.get('auth');
    if (auth && auth.token) currentToken = auth.token;
  }
  return {
    authorization: `Bearer ${currentToken}`,
  };
};

export default getHeader;
