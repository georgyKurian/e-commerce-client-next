import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const MyLayout = ({ headerContent, children, title, isPaddingTop, isNavFixed=true }) => {
  const mainCss = (isPaddingTop) ? 'pt-4 md:pt-6 lg:pt-8 xl:pt-12' : '';
  return (
    <>
      <Head>
        <title>{`E | ${title}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Header isFixed={isNavFixed}>
        {headerContent}
      </Header>
      <main className={`w-full ${mainCss}`} style={{ minHeight: '90vh' }}>{children}</main>
      <Footer />
    </>
  );
};

MyLayout.propTypes = {
  headerContent: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isNavFixed: PropTypes.bool,
  title: PropTypes.string,
  isPaddingTop: PropTypes.bool,
};

MyLayout.defaultProps = {
  headerContent:null,
  isNavFixed:true,
  children: '',
  title: '',
  isPaddingTop: true,
};

export default connect(({ auth: { user } }) => ({ user }))(MyLayout);
