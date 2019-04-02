import React, { Component } from 'react';
import s from './LoginFormView.module.scss';
export default class RegisterFromView extends Component {
  handleSubmit = async e => {
    e.preventDefault();
    const usernameForRegister = e.target.elements.username.value;
    const passwordForRegister = e.target.elements.password.value;

    await this.props.onRegister(usernameForRegister, passwordForRegister);
  };
  render() {
    return (
      <React.Fragment>
        <h2>회원가입</h2>
        <form onSubmit={this.handleSubmit} className={s.loginForm}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          {this.props.errorMessage && (
            <div>오류가 있습니다. 다시 확인해 주세요.</div>
          )}
          <button>회원가입</button>
        </form>
      </React.Fragment>
    );
  }
}
