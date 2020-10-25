import PropTypes from 'prop-types';
import useRoveFocus from '../../customHooks/useRoveFocus';
import ColorOption from './ColorOption';

const SelectColor = ({ colourList, selectedColor, onChange }) => {
  const [focus, elementRef, setFocus] = useRoveFocus(colourList ? colourList.length : 0);
  let selectedId;

  const onColourChangeHandle = (sizeName, index) => {
    onChange(sizeName);
    setFocus(index);
  };

  const colorOptionsLists = colourList.map((colourdata, index) => {
    const htmlid = `color-option-${index}`;
    if (selectedColor === colourdata.name) {
      selectedId = htmlid;
    }

    return (
      <ColorOption
        htmlid={htmlid}
        key={colourdata.name}
        index={index}
        name={colourdata.name}
        code={colourdata.code}
        handleChange={onColourChangeHandle}
        isSelected={selectedColor === colourdata.name}
        isFocussed={index === focus}
      />
    );
  });

  return (
    <>
      <h4 className="mb-2" id="select-color-label">Select Color</h4>
      <ul className="flex flex-wrap mb-2" ref={elementRef} role="listbox" aria-labelledby="select-color-label" tabIndex={0} aria-activedescendant={selectedId}>
        {colorOptionsLists}
      </ul>
    </>
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
