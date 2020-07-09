import { hot } from 'react-hot-loader/root';
import React, {Suspense} from 'react';
import './styles/AppStyle.scss'
import VerbMenu from '../VerbMenu/VerbMenu';
// TODO works?
// TODO it should be dynamically!
const TeaShopScene = React.lazy(() => import('../../sampleGame01/scenes/teaShop/TeaShopScene'));

function App() {
  console.log('%c [App] render', 'color: CRIMSON');

  return (
    <div className="App">
      <div className="App__viewport">
        <Suspense fallback={<div>loading...</div>}>
          <TeaShopScene />
        </Suspense>
        <VerbMenu />
      </div>
    </div>
  );
}

export default hot(App);
