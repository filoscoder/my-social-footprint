import 'antd/dist/antd.css'

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './lib/store/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <Store>
        <App />
      </Store>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

