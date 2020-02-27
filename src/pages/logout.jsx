import localStore from 'store2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Component } from 'react';
import { authLogout } from '../redux/actions/auth';
import MyLayout from '../components/Layouts/MyLayout';

class Logout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    localStore.clear('auth');
    dispatch(authLogout());
    Router.push('/');
  }

  render() {
    return (
      <MyLayout>
        Please wait while logging out...
      </MyLayout>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Logout);
