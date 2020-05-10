import React from 'react';

export default function ({ children, onSubmit, ...rest }) {
  return (
    <form onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}
