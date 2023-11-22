import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import SCENE_POIS from '../scenePois';

import threadB0 from '../assets/images/threadB0.png';

import thread01 from '../assets/images/thread01.png';
import thread02 from '../assets/images/thread02.png';
import thread03 from '../assets/images/thread03.png';
import thread04 from '../assets/images/thread04.png';

import thread11 from '../assets/images/thread11.png';
import thread12 from '../assets/images/thread12.png';
import thread13 from '../assets/images/thread13.png';
import thread14 from '../assets/images/thread14.png';

import thread21 from '../assets/images/thread21.png';
import thread22 from '../assets/images/thread22.png';
import thread23 from '../assets/images/thread23.png';
import thread24 from '../assets/images/thread24.png';

import thread31 from '../assets/images/thread31.png';
import thread32 from '../assets/images/thread32.png';
import thread33 from '../assets/images/thread33.png';
import thread34 from '../assets/images/thread34.png';

import thread41 from '../assets/images/thread41.png';
import thread42 from '../assets/images/thread42.png';
import thread43 from '../assets/images/thread43.png';
import thread44 from '../assets/images/thread44.png';

const imagesParamB0 = [thread01, thread02, thread03, thread04];
const imagesParamB1 = [thread11, thread12, thread13, thread14];
const imagesParamB2 = [thread21, thread22, thread23, thread24];
const imagesParamB3 = [thread31, thread32, thread33, thread34];
const imagesParamB4 = [thread41, thread42, thread43, thread44];
const imagesParamB = [imagesParamB0, imagesParamB1, imagesParamB2, imagesParamB3, imagesParamB4];
const imagesToPreload = [
  threadB0,
  ...imagesParamB0,
  ...imagesParamB1,
  ...imagesParamB2,
  ...imagesParamB3,
  ...imagesParamB4,
];

const ThreadsPoi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  const imageParamAIndex = Math.min(Math.max(sceneState.paramA, 0), 4);
  const imageParamBIndex = Math.min(Math.max(sceneState.paramB, 0), 4);
  const imagesToShow = imageParamAIndex === 0 ? [threadB0] : [imagesParamB[imageParamBIndex][imageParamAIndex - 1]];

  return (
    <Poi
      id={SCENE_POIS.threads}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      imagesToPreload={imagesToPreload}
      imagesToShow={imagesToShow}
    />
  );
};

export default ThreadsPoi;
