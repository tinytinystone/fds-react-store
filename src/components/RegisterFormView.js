import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class RegisterFromView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameForRegister: '',
      passwordForRegister: '',
      registerSuccess: false,
    };
  }
  handleSubmit = async e => {
    const { usernameForRegister, passwordForRegister } = this.state;
    e.preventDefault();
    await this.props.onRegister(usernameForRegister, passwordForRegister);
    this.setState({
      registerSuccess: true,
    });
  };
  handleUNChange = e => {
    this.setState({
      usernameForRegister: e.target.value,
    });
  };
  handlePWChange = e => {
    this.setState({
      passwordForRegister: e.target.value,
    });
  };
  render() {
    const { registerSuccess } = this.state;
    if (registerSuccess) {
      alert(`${this.state.usernameForRegister} 님 회원가입에 성공했습니다`);
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={this.handleUNChange}
            value={this.state.usernameForRegister}
          />
          <input
            type="password"
            onChange={this.handlePWChange}
            value={this.state.passwordForRegister}
            name="password"
          />
          <button>회원가입</button>
        </form>
      </React.Fragment>
    );
  }
}
