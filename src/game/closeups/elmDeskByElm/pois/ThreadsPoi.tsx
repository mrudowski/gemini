import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import SCENE_POIS from '../scenePois';
import thread0 from '../assets/images/thread0.png';
import thread1 from '../assets/images/thread1.png';
import thread2 from '../assets/images/thread2.png';
import thread3 from '../assets/images/thread3.png';
import thread4 from '../assets/images/thread4.png';

const images = [thread0, thread1, thread2, thread3, thread4];

const ThreadsPoi = () => {
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  const imageIndex = Math.min(Math.max(sceneState.paramA, 0), 4);
  const imagesToShow = [images[imageIndex]];

  return (
    <Poi
      id={SCENE_POIS.threads}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      imagesToPreload={images}
      imagesToShow={imagesToShow}
    />
  );
};

export default ThreadsPoi;
