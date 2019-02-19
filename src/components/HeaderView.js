import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import s from './HeaderView.module.scss';

const HeaderView = ({ users, logout, history }) => {
  return (
    <React.Fragment>
      <ul className={s.member}>
        {users.username ? (
          <React.Fragment>
            <li
              onClick={() => {
                logout();
                history.push('/');
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
