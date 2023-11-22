import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Gem from './engine/Gem/Gem';
import {persistor, store} from './engine/redux/store';
import CookiesInfo from './engine/cookiesInfo/CookiesInfo';

// to fix fast refresh not working with our lang files
if ((module as any).hot) {
  (module as any).hot.accept();
  // just idea from web
  // module.hot.accept("i?!?!?", () => {
  //   // then just
  //   i18next.reloadResources();
  // });
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <Gem />
      <CookiesInfo />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
