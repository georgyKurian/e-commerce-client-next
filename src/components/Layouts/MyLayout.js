import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const MyLayout = ({ children }) => (
  <div>
    <Header />
    <main className="content inner-wrap pt-32 pb-40" style={{ minHeight: '100vh' }}>{children}</main>
    <Footer />
  </div>
);

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

MyLayout.defaultProps = {
  children: '',
};
export default MyLayout;
