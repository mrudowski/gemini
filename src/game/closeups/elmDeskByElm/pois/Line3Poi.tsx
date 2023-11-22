import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import line3Image from '../assets/images/line3.png';
import SCENE_POIS from '../scenePois';

const Line3Poi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

  return (
    <Poi
      id={SCENE_POIS.line3}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      image={line3Image}
      when={sceneState.solvedEquations === 2}
    />
  );
};

export default Line3Poi;
