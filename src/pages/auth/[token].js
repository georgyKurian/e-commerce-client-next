import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import localStore from 'store2';
import { auth as authAction } from '../../redux/actions/auth';

class Auth extends Component {
  static async getInitialProps({ query, store }) {
    const { token } = query;
    await store.dispatch(authAction(token));
  }

  componentDidMount = async () => {
    const { token, user } = this.props;
    localStore.set('auth', { token, user }, true);
    Router.push('/');
  };

  render() {
    return null;
  }
}

Auth.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(({ auth }) => auth)(Auth);
