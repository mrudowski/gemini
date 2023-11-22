import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import HazelEquatImage from '../assets/images/hazelEquat.png';
import SCENE_POIS from '../scenePois';

const HazelEquatPoi = () => {
  // const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.elmDeskByHazel);

  return (
    <Poi
      id={SCENE_POIS.hazelEquat}
      style={{
        left: 174 - 128,
        top: 155 - 70,
        width: 324,
        height: 143,
      }}
      image={HazelEquatImage}
      when={sceneState.hazelEquatOn}
    />
  );
};

export default HazelEquatPoi;
