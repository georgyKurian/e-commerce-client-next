import React, { useState } from 'react';
import BaseInput from './BaseInput';

export default ((props) => {
  const [value, setValue] = useState(1);

  function handleDropdownChange(event) {
    setValue(event.target.value);
  }

  if (value < 10) {
    const options = [];
    for (let index = 1; index < 10; index += 1) {
      options.push(<option value={index}>{index}</option>);
    }
    return (
      <select onChange={handleDropdownChange}>
        {options}
        <option value="10+">10+</option>
      </select>
    );
  }
  return <BaseInput {...props} type="number" />;
});
