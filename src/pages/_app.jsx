/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import initStore from '../redux/stores';
import '../../styles/main.css';
import { authRehydrate } from '../redux/actions/auth';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx, isServer }) {
    if (!ctx.isServer) {
      MyApp.rehydrate(ctx.store);
    }
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  async componentDidMount() {
    MyApp.rehydrate(this.props.store);
  }

  static async rehydrate(store) {
    const { token } = store.getState().auth;
    if (!token) {
      await store.dispatch(authRehydrate());
    }
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
