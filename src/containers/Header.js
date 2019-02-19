import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from '../components/HeaderView';
import { connect } from 'react-redux';
import { refreshUsers, logout } from '../actions';
import { getUsers, getUserLogoutStatus } from '../reducers';

class Header extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.refreshUsers();
    }
  }
  render() {
    const { username, ...rest } = this.props;
    return <HeaderView key={username} username={username} {...rest} />;
  }
}

const mapStateToProps = (state, { history }) => {
  return {
    users: getUsers(state),
    logoutSuccess: getUserLogoutStatus(state),
  };
};

const mapDispatchToProps = dispatch => ({
  refreshUsers() {
    dispatch(refreshUsers());
  },
  logout() {
    dispatch(logout());
  },
});

Header = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

export default Header;
