import { hot } from 'react-hot-loader/root';
import React, {Suspense} from 'react';
// TODO works?
const TeaShopScene = React.lazy(() => import('./sampleGame01/scenes/teaShop/TeaShopScene'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <TeaShopScene />
      </Suspense>
    </div>
  );
}

export default hot(App);
