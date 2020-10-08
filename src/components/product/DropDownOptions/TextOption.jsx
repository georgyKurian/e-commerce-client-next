import PropTypes from 'prop-types';
import { useEffect, useRef, useCallback } from 'react';

const TextOption = ({
  index, name, value, handleChange, isFocussed, isSelected,
}) => {
  const focusRef = useRef();

  useEffect(() => {
    if (isFocussed && focusRef.current) { focusRef.current.focus(); }
  }, [focusRef.current, isFocussed]);

  const handleClick = useCallback(() => {
    handleChange(value, index);
  }, [handleChange, value, index]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleChange(value, index);
      e.preventDefault();
    }
  }, [handleChange, value, index]);

  return (
    <li
      key={name}
      role="option"
      aria-selected={isSelected}
      className={`px-4 py-2 text-sm font-normal text-left text-gray-700 hover:text-gray-900 ${isSelected ? 'bg-gray-300 border-t border-b border-gray-400' : ''} hover:bg-gray-300 focus:bg-gray-300`}
      style={{ minWidth: '15rem' }}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      value={value}
      tabIndex={isFocussed ? 0 : -1}
      ref={focusRef}
    >
      {name}
    </li>
  );
};

TextOption.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
  isFocussed: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default TextOption;
