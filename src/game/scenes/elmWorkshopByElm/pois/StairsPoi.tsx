import React from 'react';
import Poi from '../../../../engine/Poi';
import SCENE_POIS from '../scenePois';
import ACTIONS from '../../../../engine/actions';
import {useTranslation} from '../../../../engine/translation';
import SCENES from '../../../scenes';

const StairsPoi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.stairs}
      style={{
        left: 498,
        top: 160,
        width: 186,
        height: 114,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByHazel.stairs.examine})],
        },
        {
          name: t.verbs.go,
          script: [ACTIONS.gotoScene({scene: SCENES.hazelWorkshopByHazel})],
        },
      ]}
    />
  );
};

export default StairsPoi;
