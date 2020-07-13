import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const MyLayout = ({ children, title }) => (
  <>
    <Head>
      <title>{`E | ${title}`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
    </Head>
    <Header />
    <main className="pt-16 pb-40 content w-full lg:pt-16 xl:pt-16" style={{ minHeight: '100vh' }}>{children}</main>
    <Footer />
  </>
);

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  title: PropTypes.string,
};

MyLayout.defaultProps = {
  children: '',
  title: '',
};

export default connect(({ auth: { user } }) => ({ user }))(MyLayout);
