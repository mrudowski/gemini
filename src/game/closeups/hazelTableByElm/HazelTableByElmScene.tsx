import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import Closeup from '../../../engine/closeup/Closeup/Closeup';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../closeups';
import hazelTable from './assets/images/hazelCloseUp_BW.png';
import DrawerStartPoi from './pois/DrawerStartPoi';
import Equation5Poi from './pois/Equation5Poi';
import FlowerBoxPoi from './pois/FlowerBoxPoi';
import LeafBoxPoi from './pois/LeafBoxPoi';
import StalkBoxPoi from './pois/StalkBoxPoi';

const HazelTableByElmScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByElm);
  return (
    <Closeup
      id={CLOSEUPS.hazelTableByElm}
      image={hazelTable}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [
            ACTIONS.wait({duration: 1}),
            ACTIONS.talk({
              text: t.scenes.hazelTableByElm.onEnter,
            }),
            ACTIONS.endTalk(),
            ACTIONS.wait({duration: 0.5}),
            ACTIONS.setSceneState({
              scene: CLOSEUPS.hazelTableByElm,
              state: {
                drawerStartOff: true,
              },
            }),
          ],
        },
      ]}
    >
      <Equation5Poi />
      <DrawerStartPoi />
      <FlowerBoxPoi />
      <LeafBoxPoi />
      <StalkBoxPoi />
    </Closeup>
  );
};

export default HazelTableByElmScene;
