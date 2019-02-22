import React from 'react';
import LoginFormView from '../components/LoginFormView';
import { withRouter } from 'react-router-dom';
import { login } from '../actions';
import { connect } from 'react-redux';

function LoginForm({ login, history }) {
  const onLogin = async (username, password) => {
    await login(username, password);

    alert(`${username} 님 로그인에 성공했습니다`);

    return history.push('/');
  };
  return <LoginFormView onLogin={onLogin} />;
}

export default withRouter(
  connect(
    null,
    { login }
  )(LoginForm)
);
