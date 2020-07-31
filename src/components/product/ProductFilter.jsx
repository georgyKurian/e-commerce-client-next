import { useState } from 'react';
import DropDown from './DropDown';

const ProductFilter = () => {
  const [filters, setFilters] = useState([]);

  const handleFilterChange = (newFilter) => {
    setFilters({ ...filters, ...newFilter });
  };

  return (
    <ul>
      <DropDown isRight buttonText="Gender">
        <ul classNmae="">
          <li>
            <button
              type="button"
              className="px-4 py-2 text-left hover:bg-gray-200"
              style={{ minWidth: '15rem' }}
              onClick={() => handleFilterChange({ gender: 'M' })}
            >
              Male
            </button>
          </li>
          <li>
            <button
              type="button"
              className="px-4 py-2 text-left hover:bg-gray-200"
              style={{ minWidth: '15rem' }}
              onClick={() => handleFilterChange({ gender: 'F' })}
            >
              Female
            </button>
          </li>
        </ul>
      </DropDown>
    </ul>
  );
};

export default ProductFilter;
