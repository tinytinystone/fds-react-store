import React, { Component } from 'react';
import api from '../api';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameForLogin: '',
      passwordForLogin: '',
    };
  }
  handleSubmit = async e => {
    const { usernameForLogin, passwordForLogin } = this.state;
    e.preventDefault();
    await this.props.onLogin(usernameForLogin, passwordForLogin);
    alert(`${this.state.usernameForLogin} 님 로그인에 성공했습니다`);
  };
  handleUNChange = e => {
    this.setState({
      usernameForLogin: e.target.value,
    });
  };
  handlePWChange = e => {
    this.setState({
      passwordForLogin: e.target.value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>ID</label>
          <input
            type="text"
            name="username"
            onChange={this.handleUNChange}
            value={this.state.usernameForLogin}
          />
          <label>PW</label>
          <input
            type="password"
            onChange={this.handlePWChange}
            value={this.state.passwordForLogin}
            name="password"
          />
          <button>로그인</button>
        </form>
      </React.Fragment>
    );
  }
}
