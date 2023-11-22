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
        left: 842,
        top: 277,
        width: 277,
        height: 317,
      }}
      hotspot={{
        left: 50,
        top: 50,
        width: 200,
        height: 220,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.hazelWorkshopByElm.stairs.examine})],
        },
        {
          name: t.verbs.go,
          script: [
            ACTIONS.setGlobalState({state: {elmLocation: SCENES.elmWorkshopByElm}}),
            ACTIONS.gotoScene({scene: SCENES.elmWorkshopByElm}),
          ],
        },
      ]}
    />
  );
};

export default StairsPoi;
