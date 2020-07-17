import BaseInput from './BaseInput';

const TextInput = React.forwardRef((props, ref) => <BaseInput {...props} type="text" ref={ref} />);

TextInput.displayName = 'TextInput';

export default TextInput;
