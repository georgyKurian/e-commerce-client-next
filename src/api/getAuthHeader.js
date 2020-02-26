import localStore from 'store2';

const getHeader = async (token = null) => {
  let currentToken = token;
  if (!currentToken) {
    const { token: localToken } = await localStore.get('auth');
    currentToken = localToken;
  }
  return {
    authorization: `Bearer ${currentToken}`,
  };
};

export default getHeader;
