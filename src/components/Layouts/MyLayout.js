import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { UserContext } from '../../context/UserContext';

const MyLayout = ({ children, title, user }) => (
  <>
    <UserContext.Provider value={user}>
      <Head>
        <title>{`E | ${title}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="pt-12 pb-40 overflow-y-hidden content inner-wrap lg:pt-32" style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
    </UserContext.Provider>
  </>
);

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  title: PropTypes.string,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string,
    _id: PropTypes.string,
  }),
};

MyLayout.defaultProps = {
  children: '',
  title: '',
  user: {
    isAdmin: false,
    isLoggedIn: false,
    role: 'Customer',
  },
};

export default connect(({ auth: { user } }) => ({ user }))(MyLayout);
