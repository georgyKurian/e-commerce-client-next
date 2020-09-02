import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from './DropDown';
import { addFilter } from '../../redux/actions/productsPage';

const ProductFilter = ({
  name, parameterName, type, multiSelect, options,
}) => {
  const currentValue = useSelector((state) => state.productsPage.filters[parameterName]);
  const dispatch = useDispatch();

  const handleFilterChange = (value) => {
    dispatch(addFilter(parameterName, value, multiSelect));
  };

  const optionElements = options.map((option) => (
    <li key={option.name}>
      <button
        type="button"
        className="px-4 py-2 text-sm font-normal text-left text-gray-700 hover:text-gray-900 hover:bg-gray-200"
        style={{ minWidth: '15rem' }}
        onClick={() => handleFilterChange(option.value)}
      >
        {option.name}
      </button>
    </li>
  ));

  return (
    <DropDown isRight buttonText={name}>
      <ul className="">
        {optionElements}
      </ul>
    </DropDown>
  );
};

ProductFilter.propTypes = {
  name: PropTypes.string.isRequired,
  parameterName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'color', 'button']).isRequired,
  multiSelect: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default ProductFilter;
