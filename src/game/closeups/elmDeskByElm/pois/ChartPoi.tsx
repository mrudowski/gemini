import React from 'react';
import ACTIONS from '../../../../engine/actions/actions';
import Poi from '../../../../engine/Poi/Poi';
import {useSceneState} from '../../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../../engine/translation';
import CLOSEUPS from '../../closeups';
import SCENE_POIS from '../scenePois';

const ChartPoi = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);

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
          when: sceneState.solvedEquations < 2,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByElm.chart.examine})],
        },
        {
          name: t.verbs.examine,
          when: sceneState.solvedEquations === 2,
          script: [ACTIONS.talk({text: t.scenes.elmDeskByElm.chart.examine2})],
        },
      ]}
    />
  );
};

export default ChartPoi;
