import PropTypes from 'prop-types';

const Form = (({ children, ...rest }) => (
  <form {...rest}>
    {children}
  </form>
));

Form.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Form;
