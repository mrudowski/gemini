import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import elmDeskImage from '../assets/images/elmDesk.png';
import SCENE_POIS from '../scenePois';
import SCENES from '../../scenes';

const ElmDeskPoi = () => {
  const globalState = useGlobalState();

  return (
    <Poi
      id={SCENE_POIS.elmDesk}
      style={{
        left: 93,
        top: 68,
        width: 751,
        height: 653,
      }}
      image={elmDeskImage}
      when={globalState.elmLocation === SCENES.elmWorkshopByElm}
    />
  );
};

export default ElmDeskPoi;
