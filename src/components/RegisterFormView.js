import React, { Component } from 'react';

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
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <button>회원가입</button>
        </form>
      </React.Fragment>
    );
  }
}
