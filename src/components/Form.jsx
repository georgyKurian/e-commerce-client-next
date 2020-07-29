import PropTypes from 'prop-types';

const Form = (({ children, ...rest }) => (
  <form {...rest}>
    {children}
  </form>
));

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Form;
