import localStore from 'store2';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { useEffect } from 'react';
import { authLogout } from '../redux/actions/auth';
import MyLayout from '../components/Layouts/MyLayout';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStore.clear('auth');
    dispatch(authLogout());
    Router.push('/');
  });

  return (
    <MyLayout>
      Please wait while logging out...
    </MyLayout>
  );
};

export default Logout;
