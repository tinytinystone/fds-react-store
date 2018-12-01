import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import s from './LoginFormView.module.scss';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameForLogin: 'ID',
      passwordForLogin: 'PASSWORD',
      loginSuccess: false,
    };
  }
  handleSubmit = async e => {
    const { usernameForLogin, passwordForLogin } = this.state;
    e.preventDefault();
    await this.props.onLogin(usernameForLogin, passwordForLogin);
    // 로그인이 성공적으로 끝났을 때
    // Redirect 컴포넌트를 렌더링 -> 주소표시줄 상태 바꿈
    this.setState({
      loginSuccess: true,
    });
    // 로그인에 실패했을 때
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
    const { loginSuccess } = this.state;
    if (loginSuccess) {
      alert(`${this.state.usernameForLogin} 님 로그인에 성공했습니다`);
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className={s.loginForm}>
          <input
            type="text"
            name="username"
            onChange={this.handleUNChange}
            value={this.state.usernameForLogin}
          />
          <input
            type="password"
            onChange={this.handlePWChange}
            value={this.state.passwordForLogin}
            name="password"
          />
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
