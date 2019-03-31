import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import s from './Root.module.scss';
import App from './App';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <div className={s.wrap}>
        <App />
      </div>
    </Provider>
  );
};

export default Root;
