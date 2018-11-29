import React, { Component } from 'react';
import s from './NavigationView.module.scss';

export default class NavigationView extends Component {
  render() {
    return (
      <nav className={s.category}>
        <ul className={s.categoryList}>
          <li>전체 상품</li>
          <li>꽃</li>
          <li>관엽식물</li>
          <li>선인장</li>
          <li>행잉식물</li>
          <li>난</li>
        </ul>
      </nav>
    );
  }
}
