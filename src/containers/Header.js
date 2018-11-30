import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
import HeaderView from '../components/HeaderView';

export default function Header(props) {
  return (
    <UserConsumer>
      {value => <HeaderView key={value.username} {...value} />}
    </UserConsumer>
  );
}
