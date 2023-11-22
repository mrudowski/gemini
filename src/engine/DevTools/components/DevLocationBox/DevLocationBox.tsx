import React from 'react';
import './styles/DevLocationBox.scss';
// TODO as prop
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentSceneId} from '../../../redux/tempSliceSelectors';
import ACTIONS from '../../../actions/actions';
import {playScript} from '../../../scriptPlayer/scriptPlayerSlice';
import {getLookCloserSceneId} from '../../../closeup/CloseupViewer/lookCloserActionSlice';
import CLOSEUPS from '../../../../game/closeups/closeups';
import SCENES from '../../../../game/scenes/scenes';

interface IDevLocationBox {}

const SceneOptions = () => (
  <>
    {Object.keys(SCENES).map(sceneId => (
      <option key={sceneId} value={sceneId}>
        {sceneId}
      </option>
    ))}
  </>
);

const CloseupOptions = () => (
  <>
    <option value="" />
    {Object.keys(CLOSEUPS).map(sceneId => (
      <option key={sceneId} value={sceneId}>
        {sceneId}
      </option>
    ))}
  </>
);

const DevLocationBox: React.FC<IDevLocationBox> = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const closeupId = useTypedSelector(getLookCloserSceneId) || '';
  const dispatch = useTypedDispatch();

  const gotoScene = e => {
    dispatch(
      playScript({
        script: [ACTIONS.gotoScene({scene: e.target.value})],
      })
    );
  };

  const openCloseup = e => {
    if (!e.target.value) return;
    dispatch(playScript({script: [ACTIONS.lookCloser({scene: e.target.value})]}));
  };

  return (
    <div className="devPanel devLocationBox">
      <select onChange={gotoScene} value={currentSceneId}>
        <SceneOptions />
      </select>
      <select onChange={openCloseup} value={closeupId}>
        <CloseupOptions />
      </select>
    </div>
  );
};

export default DevLocationBox;
