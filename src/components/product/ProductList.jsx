import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Product from '../../models/Product';

const ProductList = ({ products }) => (
  <div className="flex flex-row items-ceter flex-wrap my-3">
    {products.map((product) => (
      <div
        className="flex w-1/2 md:w-1/3 lg:w-1/4 p-2"
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
