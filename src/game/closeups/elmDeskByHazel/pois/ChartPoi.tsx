import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useTranslation} from '../../../../engine/translation';
import SCENE_POIS from '../scenePois';

const ChartPoi = () => {
  const t = useTranslation();

  return (
    <Poi
      id={SCENE_POIS.chart}
      style={{
        left: 593 - 128,
        top: 111 - 70,
        width: 519,
        height: 514,
      }}
      verbs={[
        {
          name: t.verbs.examine,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByHazel.chart.examine})],
        },
      ]}
    />
  );
};

export default ChartPoi;
