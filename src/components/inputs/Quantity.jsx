import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

const quantitySelect = (({ value, onQuantityChange }) => {
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
      <select onChange={handleDropdownChange} value={value}>
        {options}
        <option value="10+">10+</option>
      </select>
    );
  }
  return <BaseInput {...value} type="number" value={value} onChange={handleDropdownChange} />;
});
quantitySelect.propTypes = {
  value: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default quantitySelect;
