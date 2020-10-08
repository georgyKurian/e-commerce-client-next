import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const MyLayout = ({
  headerContent, children, title, isPaddingTop, isNavFixed = true,
}) => {
  const pageWrapperElement = useRef(null);
  const mainCss = (isPaddingTop) ? 'pt-4 md:pt-6 overflow-hidden lg:pt-8 xl:pt-12' : '';
  return (
    <>
      <Head>
        <title>{`E | ${title}`}</title>
        <Meta />
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
