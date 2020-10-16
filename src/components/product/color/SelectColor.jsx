import PropTypes from 'prop-types';
import useRoveFocus from '../../customHooks/useRoveFocus';
import ColorOption from './ColorOption';

const SelectColor = ({ colourList, selectedColor, onChange }) => {
  const [focus, elementRef, setFocus] = useRoveFocus(colourList ? colourList.length : 0);

  const onColourChangeHandle = (sizeName, index) => {
    onChange(sizeName);
    setFocus(index);
  };

  return (
    <ul className="flex flex-wrap mb-2" ref={elementRef}>
      {colourList.map((colourdata, index) => (
        <ColorOption
          key={colourdata.name}
          index={index}
          name={colourdata.name}
          code={colourdata.code}
          handleChange={onColourChangeHandle}
          isSelected={selectedColor === colourdata.name}
          isFocussed={index === focus}
        />
      ))}
    </ul>
  );
};
SelectColor.propTypes = {
  colourList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })).isRequired,
  selectedColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectColor.defaultProps = {
  selectedColor: null,
};

export default SelectColor;
