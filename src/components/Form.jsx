import React from 'react';

export default function ({ children, onSubmit }) {
  return (
    <form className="flex justify-center" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
