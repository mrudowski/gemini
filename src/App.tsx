import { hot } from 'react-hot-loader/root';
import React from 'react';
import TeaShopScene from './sampleGame01/scenes/teaShop/TeaShopScene';

function App() {
  return (
    <div className="App">
      <TeaShopScene />
    </div>
  );
}

export default hot(App);
