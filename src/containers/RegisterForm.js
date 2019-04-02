import React from 'react';
import RegisterFormView from '../components/RegisterFormView';
import { withRouter } from 'react-router-dom';
import { register } from '../actions';
import { connect } from 'react-redux';

function RegisterForm({ register, history, errorMessage }) {
  const onRegister = async (username, password) => {
    await register(username, password);
    if (localStorage.getItem('token')) {
      alert(`${username} 님 회원가입에 성공했습니다`);
      history.push('/');
    } else {
      return;
    }
  };
  return (
    <RegisterFormView
      onRegister={onRegister}
      history={history}
      errorMessage={errorMessage}
    />
  );
}

const mapStateToProps = state => {
  return {
    errorMessage: state.users.errorMessage,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { register }
  )(RegisterForm)
);
