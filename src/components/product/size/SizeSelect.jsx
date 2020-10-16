import PropTypes from 'prop-types';
import useRoveFocus from '../../customHooks/useRoveFocus';
import SizeOption from './SizeOption';

const SizeSelect = ({ sizeList, selectedSize, onSizeSelect }) => {
  const [focus, elementRef, setFocus] = useRoveFocus(sizeList ? sizeList.length : 0);

  const onChangeHandle = (sizeName, index) => {
    onSizeSelect(sizeName);
    setFocus(index);
  };

  const sizeElements = sizeList.map((size, index) => (
    <SizeOption
      key={size.name}
      index={index}
      name={size.name}
      inStock={size.isStock}
      handleChange={onChangeHandle}
      isSelected={selectedSize === size.name}
      isFocussed={index === focus}
    />
  ));

  return (
    <ul className="mb-2 grid grid-cols-4 gap-0" ref={elementRef}>
      {sizeElements}
    </ul>
  );
};

SizeSelect.propTypes = {
  sizeList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isStock: PropTypes.bool.isRequired,
  })).isRequired,
  selectedSize: PropTypes.string,
  onSizeSelect: PropTypes.func.isRequired,
};

SizeSelect.defaultProps = {
  selectedSize: null,
};

export default SizeSelect;
