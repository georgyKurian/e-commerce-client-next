import { useSelector, useDispatch } from 'react-redux';
import React, {
  useEffect, useReducer, useCallback, useRef, useMemo,
} from 'react';
import { fetchProductsIfNeeded } from '../redux/actions/productsPage';
import MyLayout from '../components/Layouts/MyLayout';
import ProductList from '../components/product/ProductList';
import Product from '../models/Product';

const Shop = () => {
  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  const { getId: productMap } = useSelector((state) => state.products);
  const { isFetching, pages } = useSelector((state) => state.productsPage);

  const bottomBoundaryRef = useRef(null);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(fetchProductsIfNeeded(null, pager.page));
  }, [reduxDispatch, pager.page]);

  const scrollObserver = useCallback((node) => {
    new IntersectionObserver((entries) => {
      entries.forEach((eachEntry) => {
        if (eachEntry.intersectionRatio > 0) {
          pagerDispatch({ type: 'ADVANCE_PAGE' });
        }
      },
      {
        threshold: 0,
      });
    }).observe(node);
    pagerDispatch({ action: 'ADVANCE_PAGE' });
  }, [pagerDispatch]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  const productList = useMemo(() => {
    const newList = [];
    if (!pages) { return newList; }
    for (let i = 0; i < pager.page; i += 1) {
      pages[i].products.forEach((productId) => {
        newList.push(new Product(productMap[productId]));
      });
    }
    return newList;
  }, [pages, productMap]);

  return (
    <MyLayout title="Shop">
      <ProductList products={productList} />
      {isFetching && (<div>Loading...</div>)}
      <div ref={bottomBoundaryRef} />
    </MyLayout>
  );
};

export default Shop;
