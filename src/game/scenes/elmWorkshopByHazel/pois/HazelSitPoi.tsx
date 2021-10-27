import React from 'react';
import Poi from '../../../../engine/Poi';
import hazelSitImage from '../assets/images/hazelSit.png';
import SCENE_POIS from '../scenePois';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../../scenes';

const HazelExitPoi = () => {
  const sceneState = useSceneState(SCENES.elmWorkshopByHazel);

  return (
    <Poi
      id={SCENE_POIS.hazelSit}
      style={{
        left: 363,
        top: 180,
        width: 338,
        height: 369,
      }}
      image={hazelSitImage}
      when={sceneState.afterFirstTalk}
    />
  );
};

export default HazelExitPoi;
