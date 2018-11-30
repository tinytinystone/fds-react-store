import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './NavigationView.module.scss';

export default class NavigationView extends Component {
  render() {
    return (
      <nav className={s.category}>
        <ul className={s.categoryList}>
          <Link to="/product">
            {' '}
            <li>전체 상품</li>
          </Link>
          <Link to="/product/?category=flower">
            <li>꽃</li>
          </Link>
          <Link to="/product/?category=plant">
            <li>관엽식물</li>
          </Link>
          <Link to="/product/?category=cactus">
            <li>선인장</li>
          </Link>
          <Link to="/product/?category=hanging">
            <li>행잉식물</li>
          </Link>
          <Link to="/product/?category=orchid">
            <li>난</li>
          </Link>
        </ul>
      </nav>
    );
  }
}
