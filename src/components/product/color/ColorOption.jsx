import PropTypes from 'prop-types';
import { useCallback } from 'react';

const ColorOption = ({
  index, htmlId, name, code, handleChange, isSelected, isFocussed,
}) => {
  const handleClick = useCallback(() => {
    handleChange(name, index);
  }, [handleChange, name, index]);

  return (
    <li className="my-2 mr-2">
      <button
        htmlid={htmlId}
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
  htmlId: PropTypes.string,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFocussed: PropTypes.bool.isRequired,
};

ColorOption.defaultProps = {
  htmlId: null,
};

export default ColorOption;
