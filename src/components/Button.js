import React from 'react';

function Button({ className, children, ...rest }) {
  return (
    <button className={` rounded h-10 text-base ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function PrimaryButton({ className, ...rest }) {
  return (
    <Button className={`bg-blue-400 text-white ${className}`} {...rest} />
  );
}

export function SecondaryButton({ className, ...rest }) {
  return (
    <Button className={`border-blue-400 text-blue-400 border ${className}`} {...rest} />
  );
}
