import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import localStore from 'store2';
import { auth as authAction } from '../../redux/actions/auth';
import MyLayout from '../../components/Layouts/MyLayout';

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
    return (
      <MyLayout>
        Please wait while we fetch your data...
      </MyLayout>
    );
  }
}

Auth.propTypes = {
  token: PropTypes.string,
  user: PropTypes.shape({
    isFetching: PropTypes.bool,
    isInvalidated: PropTypes.bool,
    data: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.oneOf(['admin', 'customer']),
    }),
  }),
};

Auth.defaultProps = {
  token: null,
  user: null,
};

export default connect(({ auth }) => auth)(Auth);
