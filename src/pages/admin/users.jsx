import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import MyLayout from '../../components/Layouts/MyLayout';
import User from '../../models/User';
import { getUsers } from '../../api/Users';


class Users extends React.Component {
  static async getInitialProps() {
    const userDataList = await getUsers() || [];
    return { userDataList };
  }

  render() {
    const { userDataList } = this.props;
    const userList = userDataList.map(
      (userData) => new User(userData),
    );
    return (
      <MyLayout>
        <ul>
          {userList.map((user) => <li key={user.getId()}>{user.getEmail()}</li>)}
        </ul>
      </MyLayout>
    );
  }
}

Users.propTypes = {
  userDataList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect((state) => state.products)(Users);
