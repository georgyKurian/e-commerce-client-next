import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const MyLayout = ({
  headerContent, children, title, isPaddingTop, isNavFixed = true,
}) => {
  const pageWrapperElement = useRef(null);
  const mainCss = (isPaddingTop) ? 'pt-4 md:pt-6 overflow-hidden lg:pt-8 xl:pt-12' : '';

  return (
    <>
      <Head>
        <title>{`E | ${title}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#da532c" />
        <meta key="theme-color" name="theme-color" content="#ffffff" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <div ref={pageWrapperElement}>
        <Header isFixed={isNavFixed} pageWrapperElement={pageWrapperElement}>
          {headerContent}
        </Header>
        <main className={`w-full ${mainCss}`} style={{ minHeight: '90vh' }}>{children}</main>
        <Footer />
      </div>
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
  headerContent: null,
  isNavFixed: true,
  children: '',
  title: '',
  isPaddingTop: true,
};

export default connect(({ auth: { user } }) => ({ user }))(MyLayout);
