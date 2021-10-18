import React from 'react';
import Poi from '../../../../engine/Poi';
import hazelExitImage from '../assets/images/hazelExit.png';
import SCENE_POIS from '../scenePois';
import {useGetSceneState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../../scenes';

const HazelExitPoi = () => {
  const sceneState = useGetSceneState(SCENES.elmWorkshopByHazel);

  return (
    <Poi
      id={SCENE_POIS.hazelExit}
      style={{
        left: 615,
        top: 168,
        width: 39,
        height: 72
      }}
      image={hazelExitImage}
      when={!sceneState.afterFirstTalk}
    />
  );

};

export default HazelExitPoi;
