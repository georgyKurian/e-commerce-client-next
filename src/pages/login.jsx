import React, { useState } from 'react';
import login from '../api/Login';
import { PrimaryButton } from '../components/Button';
import Form from '../components/Form';
import TextInput from '../components/inputs/TextInput';
import MyLayout from '../components/Layouts/MyLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginResult, setLoginResult] = useState({
    isSuccess: false,
    errorMessage: undefined,
    token: undefined,
  });

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(email).then(({ error, token }) => {
      setIsLoading(false);
      if (error) {
        setLoginResult({
          isSuccess: false,
          errorMessage: error,
          token: undefined,
        });
      } else {
        setLoginResult({
          isSuccess: true,
          errorMessage: undefined,
          token,
        });
      }
    });
  };

  return (
    <MyLayout title="Login">
      <div className="flex items-center mx-auto inner-wrap">
        <div className="mx-auto lg:w-1/2">
          <h1>Login or Register</h1>
          {loginResult.isSuccess ? (
            <p className="px-6 py-6 bg-gray-200 border border-gray-300 rounded-lg">
              Click on
              {' '}
              <a className="text-blue-500" href={`auth/${loginResult.token}`}>Auth Link</a>
              {' '}
              to login!
            </p>
          ) : (
            <>
              <p className="px-6 py-6 bg-gray-200 border border-gray-300 rounded-lg">
                If you do not have an account, a new one will be setup for you
                automatically.
              </p>
              <Form onSubmit={handleSubmit} className="flex flex-col items-center md:flex-row">
                <TextInput
                  name="email"
                  label="Email Address"
                  placeholder="e.g. anna.ryan@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <PrimaryButton disabled={isLoading}>Login</PrimaryButton>
                {loginResult.error && (
                  <p style={{ color: 'crimson' }}>{loginResult.errorMessage}</p>
                )}
              </Form>
            </>
          )}
        </div>
      </div>
    </MyLayout>
  );
};

export default Login;
