import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import '../../../styles/main.css';

const MyLayout = ({ children }) => (
  <div>
    <Header />
    <div className="content inner-wrap mt-32">{children}</div>
    <Footer />
  </div>
);

MyLayout.propTypes = PropTypes.element;
export default MyLayout;
