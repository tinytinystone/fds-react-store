import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <label>ID</label>
          <input type="text" name="username" />
          <label>PW</label>
          <input type="password" name="password" />
          <button>로그인</button>
        </form>
      </React.Fragment>
    );
  }
}
