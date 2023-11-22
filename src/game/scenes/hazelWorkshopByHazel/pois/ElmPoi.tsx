import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import useElmVerbs from '../../../actors/hooks/useElmVerbs';
import SCENES from '../../scenes';
import ElmStandImage from '../assets/images/elm.png';
import SCENE_POIS from '../scenePois';

const ElmPoi = () => {
  const elmVerbs = useElmVerbs();
  const globalState = useGlobalState();
  return (
    <Poi
      id={SCENE_POIS.ElmPoi}
      style={{
        left: 662,
        top: 83,
        width: 244,
        height: 637,
      }}
      hotspot={{
        left: 20,
        top: 25,
        width: 170,
        height: 400,
      }}
      image={ElmStandImage}
      when={globalState.elmLocation === SCENES.hazelWorkshopByElm}
      verbs={[...elmVerbs]}
    />
  );
};

export default ElmPoi;
