import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import localStore from 'store2';
import { auth } from '../../redux/actions/auth';
import getCurrentUser from '../../api/Auth';

export default class Auth extends Component {
  static async getInitialProps({ query, store }) {
    const { token } = query;
    store.dispatch(auth(token));
    const userData = await getCurrentUser(token);
    return { token, userData };
  }

  componentDidMount = async () => {
    const { token } = this.props;
    localStore.set('token', token, true);
    Router.push('/');
  };

  render() {
    return null;
  }
}

Auth.propTypes = {
  token: PropTypes.string.isRequired,
};
