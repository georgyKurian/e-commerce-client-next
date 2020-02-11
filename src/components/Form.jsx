import React from 'react';
import './Form.css';

export default function ({ children, onSubmit }) {
  return (
    <form className="Form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
