import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const MyLayout = ({ children, title }) => (
  <div>
    <Head>
      <title>{`E | ${title}`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <main className="content inner-wrap pt-32 pb-40" style={{ minHeight: '100vh' }}>{children}</main>
    <Footer />
  </div>
);

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  title: PropTypes.string,
};

MyLayout.defaultProps = {
  children: '',
  title: '',
};
export default MyLayout;
