import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../../closeups/closeups';
import BoxImage from '../assets/images/box.png';
import SCENE_POIS from '../scenePois';

const BoxPoi = () => {
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);

  return (
    <Poi
      id={SCENE_POIS.BoxPoi}
      style={{
        left: 341,
        top: 482,
        width: 172,
        height: 104,
      }}
      image={BoxImage}
      when={sceneState.drawerStartOff}
    />
  );
};

export default BoxPoi;
