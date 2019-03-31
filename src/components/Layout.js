import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getUsers } from '../reducers';

import Header from '../containers/Header';
import Navigation from '../containers/Navigation';
import s from './Layout.module.scss';

class Layout extends Component {
  render() {
    const { users, ...rest } = this.props;
    return (
      <React.Fragment>
        <Header username={users.username} {...rest} />
        <Navigation />
        <main className={s.main}>{this.props.children}</main>
        <footer className={s.footer}>
          <p>© 2018 PUFFIN</p>
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { history }) => {
  return {
    users: getUsers(state),
    history,
  };
};

Layout = withRouter(
  connect(
    mapStateToProps,
    actions
  )(Layout)
);

export default Layout;
