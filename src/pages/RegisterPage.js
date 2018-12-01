import React, { Component } from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../containers/RegisterForm';

export default class RegisterPage extends Component {
  render() {
    return (
      <Layout>
        <RegisterForm />
      </Layout>
    );
  }
}
