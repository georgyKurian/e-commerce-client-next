import { useSelector, useDispatch } from 'react-redux';
import React, {
  useEffect, useReducer, useCallback, useRef, useMemo,
} from 'react';
import { fetchProductsPage } from '../redux/actions/productsPage';
import MyLayout from '../components/Layouts/MyLayout';
import Product from '../models/Product';
import ProductCard from '../components/product/ProductCard';
import ProductsBar from '../components/product/ProductsBar';

const Shop = () => {
  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 };
      case 'RESET_PAGE':
        return { ...state, page: 0 };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  const { getId: productMap } = useSelector((state) => state.products);
  const {
    isFetching, pages, filters, sortBy,
  } = useSelector((state) => state.productsPage);

  const bottomBoundaryRef = useRef(null);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (pager.page) { pagerDispatch({ type: 'RESET_PAGE' }); }
  }, [filters, sortBy]);

  useEffect(() => {
    reduxDispatch(fetchProductsPage(pager.page));
  }, [reduxDispatch, pager.page]);

  const scrollObserver = useCallback((node) => {
    new IntersectionObserver((entries) => {
      entries.forEach((eachEntry) => {
        if (eachEntry.intersectionRatio > 0 && !isFetching) {
          pagerDispatch({ type: 'ADVANCE_PAGE' });
        }
      },
      {
        threshold: 0,
      });
    }).observe(node);
  }, [pagerDispatch]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  const productList = useMemo(() => {
    const newList = [];
    if (!pages || Object.entries(pages).length === 0) {
      return newList;
    }
    for (let i = 0; i <= pager.page; i += 1) {
      if (pages[i]) {
        pages[i].products.forEach((productId) => {
          newList.push(new Product(productMap[productId]));
        });
      }
    }
    return newList;
  }, [pages, productMap, pager.page]);

  return (
    <MyLayout title="Shop">
      <>
        <ProductsBar />
        <div className="flex flex-row flex-wrap inner-wrap section items-ceter">
          {productList.map((product) => (
            <div
              className="flex w-1/2 p-1 md:p-2 sm:w-1/3 md:w-1/4"
              key={product.getId()}
            >
              <ProductCard
                key={product.getId()}
                product={product}
              />
            </div>
          ))}
        </div>
        {isFetching && (<div className="flex justify-center p-6 mx-auto bg-gray-200 border border-gray-300 rounded inner-wrap"><p>Loading...</p></div>)}
        <div ref={bottomBoundaryRef} />
      </>
    </MyLayout>
  );
};

export default Shop;
