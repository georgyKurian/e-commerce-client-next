import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdownsvg from '../../images/icons/keyboard_arrow_down.svg';

const countryCodes = [
  {
    name: 'Canada',
    code: 'CA',
  },
  {
    name: 'United States of America',
    code: 'US',
  },
];

const CountrySelect = React.forwardRef(({
  className, label, name, error, value, ...otherProps
}, ref) => {
  const [currentCountry, setCountry] = useState(value);
  const optionElements = [];
  optionElements.push(<option value="" default disabled>-select-</option>);
  if (Array.isArray(countryCodes)) {
    countryCodes.forEach((country) => {
      optionElements.push(<option key={country.code} value={country.code}>{country.name}</option>);
    });
  }

  const handleOnChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div
      className={`relative w-full flex flex-col my-4 px-4 ${className}`}
    >
      <label htmlFor={name} className="absolute pt-1 pl-4 mr-2 text-xs text-gray-500">{label}</label>
      <div className="customDropDown">
        <select
          name={name}
          ref={ref}
          className="w-full px-4 pt-6 pb-1 border border-gray-500 rounded-lg appearance-none"
          value={currentCountry}
          onChange={handleOnChange}
          {...otherProps}
        >
          {optionElements}
        </select>
        <Dropdownsvg className="absolute top-0 right-0 w-8 h-full mr-6 text-gray-500 fill-current" />
      </div>
      <span id={`${name}.error`} className={error ? 'error' : 'hidden'}>{error}</span>
    </div>
  );
});

CountrySelect.displayName = 'CountrySelect';

CountrySelect.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

CountrySelect.defaultProps = {
  label: '',
  className: '',
  value: null,
  error: '',
};

export default CountrySelect;
