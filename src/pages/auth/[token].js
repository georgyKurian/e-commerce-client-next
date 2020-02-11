import React, { Component } from 'react';
import Router from 'next/router';
import store from 'store2';
import { getCurrentUser } from '../../api/Auth';

export default class Auth extends Component {
  static async getInitialProps({ query, store }) {
    const { token } = query;
    store.dispatch(auth(token));
    const userData = await getCurrentUser(token);
    console.log({ token, userData });
    return { token, userData };
  }

  componentDidMount = async () => {
    const { token } = this.props;
    if (token) {
      await store.set('authToken', token);
      const data = await getCurrentUser();
    }
    Router.replace('//index');
  };

  render() {
    return null;
  }
}

Auth.propTypes =
