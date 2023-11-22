import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import hazelSitImage from '../assets/images/hazelSit.png';
import SCENE_POIS from '../scenePois';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import SCENES from '../../scenes';

const HazelSitPoi = () => {
  const globalState = useGlobalState();

  return (
    <Poi
      id={SCENE_POIS.hazelSit}
      style={{
        left: 363,
        top: 180,
        width: 338,
        height: 369,
      }}
      image={hazelSitImage}
      when={globalState.hazelLocation === SCENES.elmWorkshopByHazel}
    />
  );
};

export default HazelSitPoi;
