import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import {useGlobalState} from '../../../../engine/stateHooks/stateHooks';
import useHazelVerbs from '../../../actors/hooks/useHazelVerbs';
import SCENES from '../../scenes';
import hazelStandImage from '../assets/images/hazel.png';
import SCENE_POIS from '../scenePois';

const HazelPoi = () => {
  const hazelVerbs = useHazelVerbs();
  const globalState = useGlobalState();

  return (
    <Poi
      id={SCENE_POIS.HazelPoi}
      style={{
        left: 304,
        top: 174,
        width: 250,
        height: 327,
      }}
      hotspot={{
        left: 40,
        top: 25,
        width: 180,
        height: 220,
      }}
      image={hazelStandImage}
      when={globalState.hazelLocation === SCENES.hazelWorkshopByHazel}
      verbs={[...hazelVerbs]}
    />
  );
};

export default HazelPoi;
