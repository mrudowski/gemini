import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENES from '../../scenes';
import SCENE_POIS from '../scenePois';

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
      hotspot={{
        left: 80,
        top: 10,
        width: 80,
        height: 100,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmWorkshopByElm.stairs.examine})],
        },
        {
          name: t.verbs.go,
          script: [
            ACTIONS.setGlobalState({state: {elmLocation: SCENES.hazelWorkshopByElm}}),
            ACTIONS.gotoScene({scene: SCENES.hazelWorkshopByElm}),
          ],
        },
      ]}
    />
  );
};

export default StairsPoi;
