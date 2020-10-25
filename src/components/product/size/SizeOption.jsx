import PropTypes from 'prop-types';
import { useCallback } from 'react';

const SizeOption = ({
  index, htmlid, name, inStock, handleChange, isSelected, isFocussed,
}) => {
  const handleClick = useCallback(() => {
    handleChange(name, index);
  }, [handleChange, name, index]);

  return (
    <li>
      <button
        htmlid={htmlid}
        role="option"
        aria-selected={isSelected}
        disabled={!inStock}
        tabIndex={-1}
        type="button"
        className={`w-full px-2 py-2 text-sm uppercase border ronded hover:text-white hover:bg-gray-700 ${isFocussed ? 'text-white bg-gray-700' : ''} ${isSelected ? 'is-active' : ''}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </li>
  );
};

SizeOption.propTypes = {
  index: PropTypes.number.isRequired,
  htmlid: PropTypes.string,
  name: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFocussed: PropTypes.bool.isRequired,
};

SizeOption.defaultProps = {
  htmlid: null,
};

export default SizeOption;
