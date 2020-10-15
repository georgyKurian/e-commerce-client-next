/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import initStore from '../redux/stores';
import '../../styles/main.scss';
import { authRehydrate } from '../redux/actions/auth';
import { rehydrateCart } from '../redux/actions/cart';
import { rehydrateCheckout } from '../redux/actions/checkout';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export function reportWebVitals(metric) {
  console.log(metric);
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
    const { auth: { token }, cart, checkout } = store.getState();
    if (!token) {
      await store.dispatch(authRehydrate());
    }
    if (cart?.items?.length === 0) {
      await store.dispatch(rehydrateCart());
    }
    if (!(checkout && Object.keys(checkout).length !== 0)) {
      await store.dispatch(rehydrateCheckout());
    }
  }

  render() {
    const {
      Component, pageProps, store,
    } = this.props;
    return (
      <>
        <Provider store={store}>
          <Component {...pageProps} cssStyle="min-width:10px;" />
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore, { debug: true })(MyApp);
