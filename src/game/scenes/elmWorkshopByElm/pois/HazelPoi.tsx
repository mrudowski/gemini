import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import useHazelVerbs from '../../../actors/hooks/useHazelVerbs';
import SCENES from '../../scenes';
import SCENE_POIS from '../scenePois';

const HazelPoi = () => {
  const hazelVerbs = useHazelVerbs();
  const globalState = useGlobalState();

  return (
    <Poi
      id={SCENE_POIS.hazel}
      when={globalState.hazelLocation === SCENES.elmWorkshopByHazel}
      style={{
        left: 458,
        top: 207,
        width: 119,
        height: 298,
      }}
      verbs={[...hazelVerbs]}
    />
  );
};

export default HazelPoi;
