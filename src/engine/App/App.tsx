import { hot } from 'react-hot-loader/root';
import React, {Suspense} from 'react';
import './styles/AppStyle.scss';
import VerbMenu from '../VerbMenu/VerbMenu';
import DialogueWindow from '../DialogueWindow/DialogueWindow';
import {useTypedSelector} from '../redux/store';
import {getCurrentSceneId} from '../redux/gemSlice';
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
        <DialogueWindow />
        <VerbMenu />
      </div>
    </div>
  );
}

export default hot(App);
