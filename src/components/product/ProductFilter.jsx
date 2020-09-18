import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import DropDown from './DropDown';
import { addFilter } from '../../redux/actions/productsPage';
import useRoveFocus from '../customHooks/useRoveFocus';
import TextOption from './DropDownOptions/TextOption';

const ProductFilter = ({
  name, parameterName, type, multiSelect, options,
}) => {
  const currentValue = useSelector((state) => state.productsPage.filters[parameterName]);
  const dispatch = useDispatch();
  const [focus, elementRef, setFocus] = useRoveFocus(options ? options.length : 0);

  const handleFilterChange = useCallback((value, index) => {
    dispatch(addFilter(parameterName, value, multiSelect));
    setFocus(index);
  }, [parameterName, multiSelect, dispatch, addFilter, setFocus]);

  const optionElements = options.map((option, index) => {
    const isSetected = currentValue && currentValue.includes(option.value);
    const isFocussed = focus === index;
    if (type === 'text') {
      return (
        <TextOption
          key={option.value}
          index={index}
          name={option.name}
          value={option.value}
          handleChange={handleFilterChange}
          isFocussed={isFocussed}
          isSelected={isSetected}
        />
      );
    }
    return null;
  });

  return (
    <DropDown isRight buttonText={name}>
      <ul className="" ref={elementRef}>
        {optionElements}
      </ul>
    </DropDown>
  );
};

ProductFilter.propTypes = {
  name: PropTypes.string.isRequired,
  parameterName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'color', 'size', 'checkbox']).isRequired,
  multiSelect: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default ProductFilter;
