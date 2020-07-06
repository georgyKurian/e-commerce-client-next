import React from 'react';

const CountrySelect = ({ options, ...restOfProps }) => {
  let optionElements = [];
  optionElements.push(<option default disabled>-select-</option>);
  if (Array.isArray(options)) {
    optionElements = options.map((country) => (
      <option value={country.code}>{country.name}</option>));
  }
  return (
    <select {...restOfProps}>
      {optionElements}
    </select>
  );
};

export default CountrySelect;
