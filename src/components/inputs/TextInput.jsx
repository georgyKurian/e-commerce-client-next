import React from 'react';
import BaseInput from './BaseInput';

const TextInput = React.forwardRef((props, ref) => <BaseInput {...props} type="text" ref={ref} />);

export default TextInput;
