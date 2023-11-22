import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import line4Image from '../assets/images/line4.png';
import SCENE_POIS from '../scenePois';

const Line4Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.line4}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      image={line4Image}
      when={sceneState.solvedEquations === 3}
    />
  );
};

export default Line4Poi;
