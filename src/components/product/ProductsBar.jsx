import ProductFilter from './ProductFilter';
import ProductSortBy from './ProductSortBy';

const filters = [
  {
    name: 'Gender',
    parameterName: 'gender',
    type: 'text',
    multiSelect: false,
    options: [
      {
        name: 'Kids',
        value: 'K',
      },
      {
        name: 'Men',
        value: 'M',
      },
      {
        name: 'Women',
        value: 'W',
      },
      {
        name: 'Unisex',
        value: 'U',
      },
    ],
  },
  {
    name: 'category',
    parameterName: 'category',
    type: 'text',
    multiSelect: false,
    options: [
      {
        name: 'Shoes',
        value: 'shoes',
      },
      {
        name: 'Clothing',
        value: 'clothing',
      },
    ],
  },
];

const ProductsBar = () => (
  <div className="flex flex-wrap justify-between mb-4 border-t border-b border-gray-300 inner-wrap">
    <ul className="flex">
      {filters.map((filter) => (
        <ProductFilter
          key={filter.parameterName}
          name={filter.name}
          parameterName={filter.parameterName}
          type={filter.type}
          multiSelect={filter.multiSelect}
          options={filter.options}
        />
      ))}
    </ul>

    <ProductSortBy />
  </div>
);

export default ProductsBar;
