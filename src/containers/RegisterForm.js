import React from 'react';
import RegisterFormView from '../components/RegisterFormView';
import { withRouter } from 'react-router-dom';
import { register } from '../actions';
import { connect } from 'react-redux';

function RegisterForm({ register, history }) {
  const onRegister = async (username, password) => {
    await register(username, password);

    alert(`${username} 님 회원가입에 성공했습니다`);

    return history.push('/');
  };
  return <RegisterFormView onRegister={onRegister} history={history} />;
}

export default withRouter(
  connect(
    null,
    { register }
  )(RegisterForm)
);
