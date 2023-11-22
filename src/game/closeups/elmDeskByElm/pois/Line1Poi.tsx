import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import line1Image from '../assets/images/line1.png';
import SCENE_POIS from '../scenePois';

const Line1Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.line1}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      image={line1Image}
      when={sceneState.solvedEquations === 0}
    />
  );
};

export default Line1Poi;
