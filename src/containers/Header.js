import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getUsers } from '../reducers';

import HeaderView from '../components/HeaderView';

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
    history,
  };
};

Header = withRouter(
  connect(
    mapStateToProps,
    actions
  )(Header)
);

export default Header;
