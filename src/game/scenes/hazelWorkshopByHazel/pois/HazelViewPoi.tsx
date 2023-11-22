import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import hazelViewImage from '../assets/images/hazelView.png';
import SCENE_POIS from '../scenePois';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../scenes';

const HazelViewPoi = () => {
  const sceneState = useSceneState(SCENES.hazelWorkshopByHazel);

  return (
    <Poi
      id={SCENE_POIS.HazelPoi}
      style={{
        left: 558,
        top: 333,
        width: 44,
        height: 94,
      }}
      image={hazelViewImage}
      when={!sceneState.HazelDeskFront}
    />
  );
};

export default HazelViewPoi;
