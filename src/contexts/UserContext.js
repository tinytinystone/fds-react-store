import React, { Component } from 'react';

import api from '../api';

const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      username: null,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.refreshUser();
    }
  }

  async login(username, password) {
    const res = await api.post('/users/login', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    await this.refreshUser();
    // TODO: 게시글 목록 보여주기
  }

  logout() {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');
    // 사용자 정보 캐시 초기화
    this.setState({
      id: null,
      username: null,
    });
    // TODO: 로그인 폼 보여주기
  }

  async refreshUser() {
    const res2 = await api.get('/me');
    this.setState({
      id: res2.data.id,
      username: res2.data.username,
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { UserProvider, Consumer as UserConsumer, withUser };
