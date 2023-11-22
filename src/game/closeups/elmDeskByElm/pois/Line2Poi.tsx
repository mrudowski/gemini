import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import line2Image from '../assets/images/line2.png';
import SCENE_POIS from '../scenePois';

const Line2Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.line2}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      image={line2Image}
      when={sceneState.solvedEquations === 1}
    />
  );
};

export default Line2Poi;
