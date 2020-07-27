import { hot } from 'react-hot-loader/root';
import React, {Suspense} from 'react';
import './styles/AppStyle.scss';
import {useTypedSelector} from '../redux/store';
import {getCurrentSceneId} from '../redux/gemSlice';
import VerbMenu from '../VerbMenu/VerbMenu';
import Dialogue from '../Dialogue/Dialogue';
// TODO works?
// TODO it should be dynamically!

function App() {
  const currentSceneId = useTypedSelector(getCurrentSceneId);

  console.log('%c [App] render', 'color: CRIMSON');

  const CurrentScene = React.lazy(() => import(`../../sampleGame01/scenes/${currentSceneId}/Scene`));

  return (
    <div className="App">
      <div className="App__viewport">
        <Suspense fallback={<div>loading...</div>}>
          <CurrentScene />
        </Suspense>
        <Dialogue />
        <VerbMenu />
      </div>
    </div>
  );
}

export default hot(App);
