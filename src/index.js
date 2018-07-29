import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';
import Login from './modules/Login';

import './index.css';
import 'antd/dist/antd.css';

import registerServiceWorker from './registerServiceWorker';

var Home = Login;

if (localStorage.isLogin) {
  Home = App;
} else {
  Home = Login;
}

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
