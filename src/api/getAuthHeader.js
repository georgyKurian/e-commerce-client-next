import localStore from 'store2';

const getHeader = async (token = null) => {
  let currentToken = token;
  if (!currentToken) {
    currentToken = await localStore.get('token');
  }
  return {
    authorization: `Bearer ${currentToken}`,
  };
};

export default getHeader;
