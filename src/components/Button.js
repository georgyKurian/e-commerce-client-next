import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';

function Button({ className, children, ...rest }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`mx-auto text-sm font-semibold py-3 px-8 ${className}`} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

Button.defaultProps = {
  className: '',
};

export function PrimaryLink({ className, children, ...rest }) {
  return (
    <Link href="/checkout">
      <a className={`flex justify-between w-full px-5 py-3 text-sm tracking-widest text-white uppercase bg-black hover:no-underline hover:text-themeGray-500 ${className}`} {...rest}><span>{children}</span></a>
    </Link>
  );
}

export function PrimaryButton({ className, ...rest }) {
  return (
    <Button className={`bg-black uppercase text-sm tracking-widest text-left text-white ${className}`} {...rest} />
  );
}

PrimaryLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

PrimaryLink.defaultProps = {
  className: '',
};

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
