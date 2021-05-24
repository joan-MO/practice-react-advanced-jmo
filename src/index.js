import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './components/app/Root';


import { configureClient } from './api/client';
import storage from './utils/storage';
import configureStore from './store';

import './index.css';

const accessToken = storage.get('auth');
configureClient({ accessToken });
const history = createBrowserHistory();

const store = configureStore({
  preloadedState: { auth: !!accessToken },
  history,
});

const render = () => {
  ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root'),
  );
};

render();
