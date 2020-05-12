import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = React.forwardRef(({
  className, label, name, error, ...otherProps
}, ref) => (
  <div
    className={`relative w-full flex flex-col my-4 mp-4 ${className}`}
  >
    <label htmlFor={name} className="pl-4 pt-1 absolute text-gray-500 text-xs mr-2">{label}</label>
    <input name={name} className="border-b rounded-lg pt-6 pb-1 px-4 border-gray-500" ref={ref} {...otherProps} />
    {error && <span className="error">{error}</span>}
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
