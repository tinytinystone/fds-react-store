import React from 'react';
import LoginFormView from '../components/LoginFormView';
import { withRouter } from 'react-router-dom';
import { login } from '../actions';
import { connect } from 'react-redux';

function LoginForm({ login, history }) {
  return <LoginFormView onLogin={login} history={history} />;
}

LoginForm = connect(
  null,
  { login }
)(LoginForm);

export default withRouter(LoginForm);
