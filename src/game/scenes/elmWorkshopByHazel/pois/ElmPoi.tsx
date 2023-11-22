import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import useElmVerbs from '../../../actors/hooks/useElmVerbs';
import SCENES from '../../scenes';
import SCENE_POIS from '../scenePois';

const ElmPoi = () => {
  const elmVerbs = useElmVerbs();
  const globalState = useGlobalState();

  return (
    <Poi
      id={SCENE_POIS.elm}
      style={{
        left: 122,
        top: 56,
        width: 216,
        height: 432,
      }}
      when={globalState.elmLocation === SCENES.elmWorkshopByElm}
      verbs={[...elmVerbs]}
    />
  );
};

export default ElmPoi;
