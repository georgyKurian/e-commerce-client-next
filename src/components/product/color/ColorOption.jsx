import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';

const ColorOption = ({
  index, name, code, handleChange, isSelected, isFocussed,
}) => {
  const handleClick = useCallback(() => {
    handleChange(name, index);
  }, [handleChange, name, index]);

  return (
    <li className="my-2 mr-2">
      <button
        role="option"
        aria-selected={isSelected}
        type="button"
        tabIndex={-1}
        title={name}
        className={`border-2 overflow-hidden rounded-full ${isFocussed ? 'is-focus' : ''} ${isSelected ? 'is-active' : ''}`}
        onClick={handleClick}
      >
        <span className="block w-8 h-8 border-2 rounded-full" style={{ backgroundColor: code }} />
        <span className="sr-only">{name}</span>
      </button>
    </li>
  );
};

ColorOption.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFocussed: PropTypes.bool.isRequired,
};

ColorOption.defaultProps = {
};

export default ColorOption;
