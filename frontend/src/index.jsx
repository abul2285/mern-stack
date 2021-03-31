import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom';

import Pages from './pages';
import store from './reudx/store.js';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <ReduxProvider store={store}>
    <Pages />
  </ReduxProvider>,
  document.getElementById('root')
);
