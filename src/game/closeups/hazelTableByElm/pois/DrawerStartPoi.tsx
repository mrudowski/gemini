import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import CLOSEUPS from '../../closeups';
import drawerStartImage from '../assets/images/drawerStart.png';
import SCENE_POIS from '../scenePois';

const DrawerStartPoi = () => {
  // const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);

  return (
    <Poi
      id={SCENE_POIS.drawerStart}
      style={{
        left: 581 - 128,
        top: 96 - 70,
        width: 575,
        height: 524,
      }}
      image={drawerStartImage}
      when={!sceneState.drawerStartOff}
    />
  );
};

export default DrawerStartPoi;
