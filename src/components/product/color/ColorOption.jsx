import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

const ColorOption = ({
  index, name, code, handleChange, isSelected, isFocussed,
}) => {
  const focusRef = useRef();

  useEffect(() => {
    if (isFocussed && focusRef.current) { focusRef.current.focus(); }
  }, [focusRef.current, isFocussed]);

  const handleClick = useCallback(() => {
    handleChange(name, index);
  }, [handleChange, name, index]);

  return (
    <li className="mb-2 mr-2">
      <button
        type="button"
        tabIndex={isFocussed ? 0 : -1}
        title={name}
        className={`border-2 overflow-hidden rounded-full focus:outline-none ${isSelected ? 'is-active' : ''}`}
        onClick={handleClick}
        ref={focusRef}
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
