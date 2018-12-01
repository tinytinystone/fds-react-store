import React, { Component } from 'react';
import RegisterFormView from '../components/RegisterFormView';
import { withUser } from '../contexts/UserContext';

class RegisterForm extends Component {
  render() {
    const { register } = this.props;
    return <RegisterFormView onRegister={register} />;
  }
}

export default withUser(RegisterForm);
