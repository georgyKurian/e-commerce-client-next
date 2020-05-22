import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = React.forwardRef(({
  className, label, name, error, value, ...otherProps
}, ref) => (
  <div
    className={`relative w-full flex flex-col my-4 px-4 ${className}`}
  >
    <label htmlFor={name} className="absolute pt-1 pl-4 mr-2 text-xs text-gray-500">{label}</label>
    <input
      name={name}
      className="px-4 pt-6 pb-1 border border-gray-500 rounded-lg"
      ref={ref}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={`${name}.error`}
      defaultValue={value}
      {...otherProps}
    />
    <span id={`${name}.error`} className={error ? 'error' : 'hidden'}>{error}</span>
  </div>
));

BaseInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'text', 'password']).isRequired,
};

BaseInput.defaultProps = {
  label: '',
  className: '',
  error: '',
};

export default BaseInput;
