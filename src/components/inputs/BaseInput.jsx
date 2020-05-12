import React from 'react';
import PropTypes from 'prop-types';

const BaseInput = React.forwardRef((props, ref) => (
  <div
    className={`BaseInput ${
      props.type === 'checkbox' ? 'BaseInputReverse' : ''
    }`}
  >
    <label htmlFor={props.name} className="text-gray-600 mr-2">{props.label}</label>
    <input id={props.name} className="border-b-2 border-gray-500" ref={ref} {...props} />
  </div>
));

BaseInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'text', 'password']).isRequired,
};

BaseInput.defaultProps = {
  label: '',
};

export default BaseInput;
