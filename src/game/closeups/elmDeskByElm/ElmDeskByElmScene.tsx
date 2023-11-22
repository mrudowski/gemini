import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import Closeup from '../../../engine/closeup/Closeup/Closeup';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../closeups';
import elmDesk from './assets/images/elmCloseUp_BW.jpg';
import AbacusPoi from './pois/AbacusPoi';
import ChartPoi from './pois/ChartPoi';
import Equation1Poi from './pois/Equation1Poi';
import Line1Poi from './pois/Line1Poi';
import AbacusWhiteStonesPoi from './pois/AbacusWhiteStonesPoi';
import Line2Poi from './pois/Line2Poi';
import Line3Poi from './pois/Line3Poi';
import ThreadsPoi from './pois/ThreadsPoi';

const ElmDeskByElmScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.elmDeskByElm);
  return (
    <Closeup
      id={CLOSEUPS.elmDeskByElm}
      image={elmDesk}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [
            ACTIONS.talk({
              text: t.scenes.elmDeskByElm.onEnter,
            }),
          ],
        },
      ]}
    >
      <Equation1Poi />
      <AbacusWhiteStonesPoi />
      <AbacusPoi />
      <Line1Poi />
      <Line2Poi />
      <Line3Poi />
      <ThreadsPoi />
      <ChartPoi />
    </Closeup>
  );
};

export default ElmDeskByElmScene;
