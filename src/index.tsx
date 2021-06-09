import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {store} from './engine/redux/store';
import Gem from './engine/Gem/Gem';

// React.StrictMode is a wrapper to help prepare apps for async rendering
// https://reactjs.org/docs/strict-mode.html

// StrictMode renders components twice (on dev but not production) in order to detect unexpected side effects in the render-phase lifecycles

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Gem />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
