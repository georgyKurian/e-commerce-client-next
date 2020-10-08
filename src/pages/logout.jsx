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
      <div className="flex items-center mx-auto inner-wrap">
        <div className="mx-auto text-center lg:w-1/2">
          <p className="px-6 py-6 bg-gray-200 border border-gray-300 rounded-lg">Please wait while logging out...</p>
        </div>
      </div>
    </MyLayout>
  );
};

export default Logout;
