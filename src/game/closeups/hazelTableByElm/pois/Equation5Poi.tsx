import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENE_POIS from '../scenePois';

const Equation5Poi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.equation5}
      style={{
        left: 130 - 128,
        top: 134 - 70,
        width: 421,
        height: 478,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelTableByElm.equation5.examine})],
        },
      ]}
    />
  );
};

export default Equation5Poi;
