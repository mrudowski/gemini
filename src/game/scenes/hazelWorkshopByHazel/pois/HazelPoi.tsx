import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import hazelStandImage from '../assets/images/hazel.png';
import SCENE_POIS from '../scenePois';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../scenes';

const HazelPoi = () => {
  const sceneState = useSceneState(SCENES.hazelWorkshopByHazel);

  return (
    <Poi
      id={SCENE_POIS.HazelPoi}
      style={{
        left: 304,
        top: 194,
        width: 250,
        height: 307,
      }}
      image={hazelStandImage}
      when={sceneState.HazelDeskFront}
    />
  );
};

export default HazelPoi;
