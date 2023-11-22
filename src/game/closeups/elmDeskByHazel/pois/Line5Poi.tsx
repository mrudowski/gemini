import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import line5Image from '../assets/images/line5.png';
import SCENE_POIS from '../scenePois';

const Line5Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.line5}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      image={line5Image}
      when={sceneState.solvedEquations === 4}
    />
  );
};

export default Line5Poi;
