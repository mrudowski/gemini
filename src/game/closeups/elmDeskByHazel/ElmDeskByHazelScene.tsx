import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import Closeup from '../../../engine/closeup/Closeup/Closeup';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../closeups';
import elmDesk from './assets/images/elmCloseUp.jpg';
import AbacusBlackPoi from './pois/AbacusBlackPoi';
import AbacusWhitePoi from './pois/AbacusWhitePoi';
import ChartPoi from './pois/ChartPoi';
import Equation1Poi from './pois/Equation1Poi';
import HazelEquatPoi from './pois/HazelEquatPoi';
import Line4Poi from './pois/Line4Poi';
import Line5Poi from './pois/Line5Poi';
import AbacusWhiteStonesPoi from './pois/AbacusWhiteStonesPoi';
import AbacusBlackStonesPoi from './pois/AbacusBlackStonesPoi';
import Line3Poi from '../elmDeskByElm/pois/Line3Poi';
import ThreadsPoi from './pois/ThreadsPoi';

const ElmDeskByHazelScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.elmDeskByHazel);
  return (
    <Closeup
      id={CLOSEUPS.elmDeskByHazel}
      image={elmDesk}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [
            ACTIONS.wait({duration: 1}),
            ACTIONS.talk({
              text: t.scenes.elmDeskByHazel.onEnter,
            }),
            ACTIONS.endTalk(),
            ACTIONS.wait({duration: 0.5}),
            ACTIONS.setSceneState({
              scene: CLOSEUPS.elmDeskByHazel,
              state: {
                hazelEquatOn: true,
              },
            }),
          ],
        },
      ]}
    >
      <Equation1Poi />
      <HazelEquatPoi />
      <AbacusWhiteStonesPoi />
      <AbacusBlackStonesPoi />
      <AbacusWhitePoi />
      <AbacusBlackPoi />
      <Line4Poi />
      <Line5Poi />
      <Line3Poi />
      <ThreadsPoi />
      <ChartPoi />
    </Closeup>
  );
};

export default ElmDeskByHazelScene;
