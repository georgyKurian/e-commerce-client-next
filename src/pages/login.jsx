import React, { Component } from 'react';
import login from '../api/Login';
import { PrimaryButton } from '../components/Button';
import Form from '../components/Form';
import TextInput from '../components/inputs/TextInput';
import MyLayout from '../components/Layouts/MyLayout';

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      email: '', loading: false, done: false, error: undefined,
    };
  }

  handleEmailChange = (e) => this.setState({ email: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log('Requesting');

    await login(this.state.email);

    this.setState({ done: true });
    this.setState({ loading: false });
  };

  render() {
    const {
      email, loading, done, error,
    } = this.state;
    return (
      <MyLayout>
        <h1>Login or Register</h1>
        {done ? (
          <p>We sent a magic link to your email. Click on it to login!</p>
        ) : (
          <>
            <p className="border border-gray-300 bg-gray-200 py-6 px-6 rounded-lg">
              If you do not have an account, a new one will be setup for you
              automatically.
            </p>
            <Form onSubmit={this.handleSubmit} className="flex">
              <TextInput
                name="email"
                label="Email Address"
                placeholder="e.g. anna.ryan@gmail.com"
                value={email}
                onChange={this.handleEmailChange}
              />
              <PrimaryButton disabled={loading}>Login</PrimaryButton>
              {error && (
                <p style={{ color: 'crimson' }}>{error}</p>
              )}
            </Form>
          </>
        )}
      </MyLayout>
    );
  }
}
