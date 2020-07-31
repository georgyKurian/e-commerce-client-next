import ProductFilter from './ProductFilter';
import ProductSortBy from './ProductSortBy';

const ProductsBar = () => (
  <div className="flex flex-wrap justify-between mb-4 border-t border-b border-gray-300 inner-wrap">
    <ProductFilter />
    <ProductSortBy />
  </div>
);

export default ProductsBar;
