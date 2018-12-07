import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
// import { withRouter } from 'react-router-dom';
// import { withUser } from '../contexts/UserContext';
import HeaderView from '../components/HeaderView';

export default function Header(props) {
  return (
    <UserConsumer>
      {value => <HeaderView key={value.username} {...value} />}
    </UserConsumer>
  );
}

// export default withRouter(withUser(HeaderView));
// withRouter로 둘러싼 컴포넌트는 match, history, location prop을 받는다.
