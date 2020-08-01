import { useDispatch, useSelector } from 'react-redux';
import DropDown from './DropDown';
import { updateSorting } from '../../redux/actions/productsPage';

const SORT_BY = [
  {
    name: 'Price [low - high]',
    value: 'price-low-to-high',
  },
  {
    name: 'Newtest',
    value: 'newest',
  },
  {
    name: 'Price [high - low]',
    value: 'price-high-to-low',
  },
];

const ProductSortBy = () => {
  const sortByValue = useSelector((state) => state.productsPage.sortBy);
  const dispatch = useDispatch();

  const sortBy = SORT_BY.find((sort) => sort.value === sortByValue);

  const handleSortByChange = (sortValue) => {
    dispatch(updateSorting(sortValue));
  };

  return (
    <ul>
      <DropDown isRight={false} buttonText={!sortBy ? 'Sort By' : sortBy.name}>
        <ul className="">
          {
              SORT_BY.map((sort) => (
                <li key={sort.name}>
                  <button
                    type="button"
                    className={`px-4 py-2 text-left hover:bg-gray-200 ${sortBy?.value === sort.value ? 'font-semibold' : ''}`}
                    style={{ minWidth: '15rem' }}
                    onClick={() => handleSortByChange(sort.value)}
                  >
                    {sort.name}
                  </button>
                </li>
              ))
            }
        </ul>
      </DropDown>
    </ul>
  );
};

export default ProductSortBy;
