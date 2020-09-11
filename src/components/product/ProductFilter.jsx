import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useRef, useEffect } from 'react';
import DropDown from './DropDown';
import { addFilter } from '../../redux/actions/productsPage';
import useRoveFocus from '../customHooks/useRoveFocus';

const ProductFilter = ({
  name, parameterName, type, multiSelect, options,
}) => {
  const currentValue = useSelector((state) => state.productsPage.filters[parameterName]);
  const dispatch = useDispatch();
  const currentFocusRef = useRef();
  const [focus, setFocus] = useRoveFocus(options ? options.length : 0);

  const handleFilterChange = useCallback((value, index) => {
    dispatch(addFilter(parameterName, value, multiSelect));
    setFocus(index);
  }, [parameterName, multiSelect, dispatch, addFilter, setFocus]);

  useEffect(() => {
    currentFocusRef.current.focus();
  }, [currentFocusRef.current]);

  const onKeyPress = useCallback((e, value, index) => {
    if (e.key === 'Enter') {
      handleFilterChange(value, index);
    }
  }, [handleFilterChange, setFocus]);

  const optionElements = options.map((option, index) => (
    <li
      key={option.name}
      role="option"
      aria-selected={currentValue && currentValue.includes(option.value)}
      className="px-4 py-2 text-sm font-normal text-left text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:bg-gray-200"
      style={{ minWidth: '15rem' }}
      onClick={() => {
        handleFilterChange(option.value, index);
      }}
      onKeyPress={(e) => onKeyPress(e, option.value, index)}
      value={option}
      tabIndex={(focus === index) ? 0 : -1}
      ref={(focus === index) ? currentFocusRef : null}
    >
      {option.name}

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