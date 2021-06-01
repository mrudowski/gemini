import React from 'react';
import './styles/DevLocationBox.scss';
// TODO as prop
import {IWorldState, worldInitialState} from '../../../../sampleGame01/worldState';

interface IDevLocationBox {
}

const buildLocationList = (scenes: IWorldState['scenes']) => Object.keys(scenes).map((sceneId) => (
  <option key={sceneId} value={sceneId}>{sceneId}</option>
));

const DevLocationBox: React.FC<IDevLocationBox> = () => {

  const gotoScene = e => {
    console.log('%c [mr] gotoScene', 'background-color:Gold; color: black', e.value);
    //gem.world.gotoScene($(this).val());
  };

  return (
    <div className="devPanel devLocationBox">
      <select onChange={gotoScene}>
        {buildLocationList(worldInitialState.scenes)}
      </select>
    </div>
  );
};

export default DevLocationBox;
