import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Product from '../../models/Product';

const ProductList = ({ products }) => (
  <div className="flex flex-row flex-wrap my-3 items-ceter">
    {products.map((product) => (
      <div
        className="flex w-1/2 p-1 xl:p-6 md:w-1/2 lg:w-1/3 xl:w-1/3"
        key={product.getId()}
      >
        <ProductCard
          key={product.getId()}
          id={product.getId()}
          name={product.getName()}
          images={product.getImages()}
          price={product.getFormattedPrice()}
          isFeatured={product.getIsFeatured()}
          avgRating={product.getAvgRating()}
          reviewCount={product.getReviewCount()}
        />
      </div>
    ))}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(Product)).isRequired,
};

export default ProductList;
