import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { initStore } from '../redux/stores';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <Provider store={store} cssStyle="min-width:10px;">
          <Component {...pageProps} cssStyle="min-width:10px;" />
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore, { debug: true })(MyApp);
