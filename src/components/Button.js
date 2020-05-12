import React from 'react';
import { PropTypes } from 'prop-types';

function Button({ className, children, ...rest }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`mx-auto rounded-lg h-10 text-base w-32 ${className}`} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
};

export function PrimaryButton({ className, ...rest }) {
  return (
    <Button className={`bg-blue-400 text-white ${className}`} {...rest} />
  );
}

PrimaryButton.propTypes = {
  className: PropTypes.string,
};

PrimaryButton.defaultProps = {
  className: '',
};

export function SecondaryButton({ className, ...rest }) {
  return (
    <Button className={`border-blue-400 text-blue-400 border ${className}`} {...rest} />
  );
}

SecondaryButton.propTypes = {
  className: PropTypes.string,
};

SecondaryButton.defaultProps = {
  className: '',
};
