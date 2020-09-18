import { useSelector, useDispatch } from 'react-redux';
import ProductFilter from './ProductFilter';
import ProductSortBy from './ProductSortBy';
import CloseSVG from '../../images/icons/close.svg';
import { removeFilter } from '../../redux/actions/productsPage';
import MenuBar from '../MenuBar';
import { MobileAndTablet, Desktop } from '../Devices';
import SVGDownKey from '../../images/icons/keyboard_arrow_down.svg';

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

const ProductsBar = () => {
  const currentFilters = useSelector((state) => state.productsPage.filters);
  const dispatch = useDispatch();

  const handleFilterClick = (parameterName, filterValue) => {
    dispatch(removeFilter(parameterName, filterValue));
  };

  return (
    <>
      <div className="mb-4">
        <MobileAndTablet>
          <div className="flex">
            <button type="button" className="flex-1 px-2 py-2 border border-l-0 border-r-0 border-black">
              <span className="float-left">Filter By</span>
              <SVGDownKey className="float-right w-3 mt-1" />
            </button>
            <button type="button" className="flex-1 px-2 py-2 border border-r-0 border-black">
              <span className="float-left">Sort By</span>
              <SVGDownKey className="float-right w-3 mt-1" />
            </button>
          </div>
        </MobileAndTablet>
        <Desktop>
          <MenuBar className="flex justify-between inner-wrap">
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
          </MenuBar>
        </Desktop>
      </div>

      <div className="flex flex-wrap mb-4 text-xs inner-wrap">
        {Object.keys(currentFilters).map((filterKey) => {
          const filterObject = filters.find((filter) => filter.parameterName === filterKey);
          const filterOption = filterObject.options
            .find((option) => currentFilters[filterKey].includes(option.value));
          return (
            <button
              type="button"
              className="px-2 mx-1 bg-gray-200 border border-gray-300 cursor-pointer text-themeGray-500"
              key={`${filterKey}_${currentFilters[filterKey]}`}
              onClick={() => { handleFilterClick(filterKey, filterOption.value); }}
            >
              {filterOption.name}
              {' '}
              <CloseSVG className="w-2 h-2 fill-current" />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ProductsBar;
