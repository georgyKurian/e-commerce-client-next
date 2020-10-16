import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

const SizeOption = ({
  index, name, inStock, handleChange, isSelected, isFocussed,
}) => {
  const focusRef = useRef();

  useEffect(() => {
    if (isFocussed && focusRef.current) {
      focusRef.current.focus();
    }
  }, [focusRef.current, isFocussed]);

  const handleClick = useCallback(() => {
    handleChange(name, index);
  }, [handleChange, name, index]);

  return (
    <li>
      <button
        disabled={!inStock}
        tabIndex={isFocussed ? 0 : -1}
        type="button"
        className={`w-full px-2 py-2 text-sm uppercase border ronded hover:text-white hover:bg-black focus:text-white focus:bg-gray-700 ${isSelected ? 'is-active' : ''}`}
        onClick={handleClick}
        ref={focusRef}
      >
        {name}
      </button>
    </li>
  );
};

SizeOption.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFocussed: PropTypes.bool.isRequired,
};

SizeOption.defaultProps = {
};

export default SizeOption;
