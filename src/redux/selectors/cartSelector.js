import { createSelector } from 'reselect';

const itemsSelector = (state) => state.cart.items;
const itemsProductsSelector = (state) => state.products.getId;

const totalSelector = createSelector(
  shopItemsSelector,
  (items) => items.reduce((acc, item) => acc + item.value, 0),
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100),
);

const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax }),
);

export default totalSelector;
