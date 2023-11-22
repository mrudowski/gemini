import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../../closeups/closeups';
import FlowersImage from '../assets/images/flowers.png';
import SCENE_POIS from '../scenePois';

const FlowersPoi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);

  return (
    <Poi
      id={SCENE_POIS.FlowersPoi}
      style={{
        left: 341,
        top: 482,
        width: 172,
        height: 104,
      }}
      image={FlowersImage}
      when={sceneState.hazelPuzzleSolved}
    />
  );
};

export default FlowersPoi;
