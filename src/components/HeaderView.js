import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutSuccess: false,
    };
  }
  render() {
    const { username, logout } = this.props;
    const { logoutSuccess } = this.state;
    if (logoutSuccess) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Link to="/">
          <h1>쇼핑몰</h1>
        </Link>
        {username ? (
          <React.Fragment>
            <div>{username} 님 환영합니다</div>
            <div
              onClick={() => {
                logout();
                this.setState({
                  logoutSuccess: true,
                });
              }}
            >
              로그아웃
            </div>
          </React.Fragment>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </React.Fragment>
    );
  }
}
