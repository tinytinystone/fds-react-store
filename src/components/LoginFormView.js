import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './LoginFormView.module.scss';

export default class LoginForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();
    const usernameForLogin = e.target.elements.username.value;
    const passwordForLogin = e.target.elements.password.value;

    await this.props.onLogin(usernameForLogin, passwordForLogin);
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className={s.loginForm}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <button>로그인</button>
        </form>
        <div>
          <p>아직 회원이 아니신가요?</p>
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
