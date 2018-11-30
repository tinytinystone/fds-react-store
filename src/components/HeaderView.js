import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import s from './HeaderView.module.scss';

export default class HeaderView extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     logoutSuccess: false,
  //   };
  // }
  render() {
    const { username, logout } = this.props;
    const { history } = this.props;
    // const { logoutSuccess } = this.state;
    // if (logoutSuccess) {
    //   return <Redirect to="/" />;
    // }
    return (
      <React.Fragment>
        <ul className={s.member}>
          {username ? (
            <React.Fragment>
              <li
                onClick={() => {
                  logout();
                  // this.setState({ logoutSuccess: true });
                  history.push('/');
                }}
                key={1}
                className={s.signOut}
              >
                SIGN OUT
              </li>
            </React.Fragment>
          ) : (
            <Link to="/login">
              <li key={2} className={s.signIn}>
                SIGN IN
              </li>
            </Link>
          )}
          <li key={3} className={s.signUp}>
            SIGN UP
          </li>
          <li key={4} className={s.myCart}>
            MY CART
          </li>
          <li key={5} className={s.order}>
            ORDER
          </li>
        </ul>
        <Link to="/">
          <h1 className={s.logo}>GARDEN</h1>
        </Link>
      </React.Fragment>
    );
  }
}
