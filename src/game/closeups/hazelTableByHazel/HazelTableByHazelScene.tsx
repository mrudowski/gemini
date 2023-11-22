import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import Closeup from '../../../engine/closeup/Closeup/Closeup';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import CLOSEUPS from '../closeups';
import hazelTable from './assets/images/hazelCloseUp.jpg';
import BlueFlowerBoxPoi from './pois/BlueFlowerBoxPoi';
import BlueStalkBoxPoi from './pois/BlueStalkBoxPoi';
import Equation1Poi from './pois/Equation1Poi';
import Equation2Poi from './pois/Equation2Poi';
import Equation3Poi from './pois/Equation3Poi';
import Equation4Poi from './pois/Equation4Poi';
import Equation5Poi from './pois/Equation5Poi';
import GreenLeafBoxPoi from './pois/GreenLeafBoxPoi';
import GreenStalkBoxPoi from './pois/GreenStalkBoxPoi';
import PinkStalkBoxPoi from './pois/PinkStalkBoxPoi';
import PurpleLeafBoxPoi from './pois/PurpleLeafBoxPoi';
import RedFlowerBoxPoi from './pois/RedFlowerBoxPoi';
import YellowFlowerBoxPoi from './pois/YellowFlowerBoxPoi';
import YellowLeafBoxPoi from './pois/YellowLeafBoxPoi';

const HazelTableByHazelScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(CLOSEUPS.hazelTableByHazel);
  return (
    <Closeup
      id={CLOSEUPS.hazelTableByHazel}
      image={hazelTable}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [
            ACTIONS.talk({
              text: t.scenes.hazelTableByHazel.onEnter,
            }),
          ],
        },
        {
          when: sceneState.solvedEquations === 4,
          script: [
            ACTIONS.talk({
              text: t.scenes.hazelTableByHazel.onEnter2,
            }),
          ],
        },
      ]}
    >
      <Equation1Poi />
      <Equation2Poi />
      <Equation3Poi />
      <Equation4Poi />
      <Equation5Poi />
      <RedFlowerBoxPoi />
      <BlueFlowerBoxPoi />
      <YellowFlowerBoxPoi />
      <GreenLeafBoxPoi />
      <YellowLeafBoxPoi />
      <PurpleLeafBoxPoi />
      <BlueStalkBoxPoi />
      <PinkStalkBoxPoi />
      <GreenStalkBoxPoi />
    </Closeup>
  );
};

export default HazelTableByHazelScene;
