import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import hazelExitImage from '../assets/images/hazelExit.png';
import SCENE_POIS from '../scenePois';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../scenes';

const HazelExitPoi = () => {
  const sceneState = useSceneState(SCENES.elmWorkshopByHazel);

  return (
    <Poi
      id={SCENE_POIS.hazelExit}
      style={{
        left: 615,
        top: 168,
        width: 39,
        height: 72,
      }}
      image={hazelExitImage}
      when={!sceneState.hazelOnDesk}
    />
  );
};

export default HazelExitPoi;
