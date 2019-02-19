import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import s from './HeaderView.module.scss';

const HeaderView = ({ users: username, logout, logoutSuccess }) => {
  if (logoutSuccess) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <ul className={s.member}>
        {username ? (
          <React.Fragment>
            <li
              onClick={() => {
                logout();
                this.setState({ logoutSuccess: true });
              }}
              className={s.signOut}
            >
              SIGN OUT
            </li>
          </React.Fragment>
        ) : (
          <Link to="/login">
            <li className={s.signIn}>SIGN IN</li>
          </Link>
        )}
        <Link to="/cart">
          <li className={s.myCart}>MY CART</li>
        </Link>
        <Link to="/order">
          <li className={s.order}>ORDER</li>
        </Link>
      </ul>
      <Link to="/">
        <h1 className={s.logo}>GARDEN</h1>
      </Link>
    </React.Fragment>
  );
};

export default HeaderView;
