import React from 'react';
import './styles/DevLocationBox.scss';
// TODO as prop
import {IWorldState, worldInitialState} from '../../../../game/worldState';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentSceneId} from '../../../redux/gemSlice';
import {setNextSceneId} from '../../../redux/tempSlice';

interface IDevLocationBox {}

const buildLocationList = (scenes: IWorldState['scenes']) =>
  Object.keys(scenes).map(sceneId => (
    <option key={sceneId} value={sceneId}>
      {sceneId}
    </option>
  ));

const DevLocationBox: React.FC<IDevLocationBox> = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const dispatch = useTypedDispatch();

  const gotoScene = e => {
    dispatch(setNextSceneId(e.target.value));
  };

  return (
    <div className="devPanel devLocationBox">
      <select onChange={gotoScene} value={currentSceneId}>
        {buildLocationList(worldInitialState.scenes)}
      </select>
    </div>
  );
};

export default DevLocationBox;
