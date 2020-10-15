import PropTypes from 'prop-types';

const quantitySelect = (({
  name, value, onQuantityChange, ...otherProps
}) => {
  function handleDropdownChange(event) {
    const newQuantity = Number.parseInt(event.target.value, 10);
    onQuantityChange(newQuantity);
  }

  if (value < 10) {
    const options = [];
    for (let index = 1; index < 10; index += 1) {
      options.push(<option key={index} value={index}>{index}</option>);
    }
    return (
      <label htmlFor="product-quantity">
        <span className="sr-only">Quantity</span>
        <select onChange={handleDropdownChange} value={value} {...otherProps}>
          {options}
          <option value="10+">10+</option>
        </select>
      </label>
    );
  }
  return (
    <label htmlFor="product-quantity">
      <span className="sr-only">Quantity</span>
      <input
        name={name}
        className="px-4 py-6 pb-1 border border-gray-500 rounded-lg"
        defaultValue={value}
        type="number"
        onChange={handleDropdownChange}
        {...otherProps}
      />
    </label>
  );
});

quantitySelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

quantitySelect.defaultProps = {
  name: '',
};

export default quantitySelect;
