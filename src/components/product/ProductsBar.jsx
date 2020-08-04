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
        value: 'k',
      },
      {
        name: 'Men',
        value: 'm',
      },
      {
        name: 'Women',
        value: 'f',
      },
    ],
  },
  {
    name: 'Size',
    parameterName: 'size',
    type: 'text',
    multiSelect: false,
    options: [
      {
        name: 'Small',
        value: 's',
      },
      {
        name: 'Medium',
        value: 'm',
      },
      {
        name: 'Large',
        value: 'l',
      },
      {
        name: 'x-Large',
        value: 'xl',
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
