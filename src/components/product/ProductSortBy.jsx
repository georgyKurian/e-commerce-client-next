import { useState } from 'react';
import DropDown from './DropDown';

const SORT_BY = [
  {
    name: 'Price [low - high]',
    attr: 'price',
    asc: true,
  },
  {
    name: 'Newtest',
    attr: 'created_at',
    asc: false,
  },
  {
    name: 'Price [high - low]',
    attr: 'price',
    asc: false,
  },
];

const ProductSortBy = () => {
  const [sortBy, setSortBy] = useState(null);

  const handleSortByChange = (name) => {
    setSortBy(name);
  };

  return (
    <ul>
      <DropDown isRight={false} buttonText={!sortBy ? 'Sort By' : sortBy}>
        <ul classNmae="">
          {
              SORT_BY.map((sort) => (
                <li key={sort.name}>
                  <button
                    type="button"
                    className={`px-4 py-2 text-left hover:bg-gray-200 ${sortBy === sort.name ? 'font-semibold' : ''}`}
                    style={{ minWidth: '15rem' }}
                    onClick={() => handleSortByChange(sort.name)}
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
