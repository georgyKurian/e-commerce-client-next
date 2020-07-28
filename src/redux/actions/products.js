import { getProducts } from '../../api/Product';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';

function addProductsAction(productDataList) {
  return {
    type: ADD_PRODUCTS,
    productDataList,
  };
}

function shouldFetchProducts(state) {
  const { products } = state;
  if (!(products) || (products.getAllIds.length === 0)) {
    return true;
  }
  return products.didInvalidate;
}

export function addProducts(productDataList) {
  return (dispatch) => dispatch(addProductsAction(productDataList));
}
/**
 * Thunk action creator
 */
export function fetchProducts(categories) {
  return (dispatch) => getProducts(categories).then(
    (productDataList) => dispatch(addProducts(productDataList)),
  );
}

export function fetchProductsIfNeeded(categories) {
  return ((dispatch, getState) => {
    if (shouldFetchProducts(getState())) {
      return dispatch(fetchProducts(categories));
    }
    return null;
  });
}

export function fetchProductsByIds(productIdList) {
  return ((dispatch) => dispatch(fetchProducts({ id: productIdList.join(',') })));
}
