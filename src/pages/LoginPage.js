import React, { Component } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../containers/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    );
  }
}
