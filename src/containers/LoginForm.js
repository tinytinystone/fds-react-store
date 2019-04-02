import React from 'react';
import LoginFormView from '../components/LoginFormView';
import { withRouter } from 'react-router-dom';
import { login } from '../actions';
import { connect } from 'react-redux';

function LoginForm({ login, history, errorMessage }) {
  const onLogin = async (username, password) => {
    await login(username, password);
    if (localStorage.getItem('token')) {
      alert(`${username} 님 로그인에 성공했습니다`);
      history.push('/');
    } else {
      return;
    }
  };
  return <LoginFormView onLogin={onLogin} errorMessage={errorMessage} />;
}

const mapStateToProps = state => {
  return {
    errorMessage: state.users.errorMessage,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(LoginForm)
);
