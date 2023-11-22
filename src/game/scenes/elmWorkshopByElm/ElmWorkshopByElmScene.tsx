import React from 'react';
import ACTIONS from '../../../engine/actions/actions';
import Scene from '../../../engine/scene/Scene';
import {useSceneState} from '../../../engine/stateHooks/stateHooks';
import {useTranslation} from '../../../engine/translation';
import {SOUNDS_TRACKS} from '../../sounds/sounds';
import SCENES from '../scenes';
import elmWorkshop from './assets/images/elmWorkshop.jpg';
import DeskPoi from './pois/DeskPoi';
import ElmDeskPoi from './pois/ElmDeskPoi';
import HazelExitPoi from './pois/HazelExitPoi';
import HazelPoi from './pois/HazelPoi';
import HazelSitPoi from './pois/HazelSitPoi';
import StairsPoi from './pois/StairsPoi';

const ElmWorkshopByElmScene = () => {
  const t = useTranslation();
  const sceneState = useSceneState(SCENES.elmWorkshopByElm);
  return (
    <Scene
      id={SCENES.elmWorkshopByElm}
      image={elmWorkshop}
      sounds={SOUNDS_TRACKS.storyCombo}
      hideHud={['notebook', 'inventory']}
      onEnter={[
        {
          when: !sceneState.visited,
          script: [ACTIONS.wait({duration: 1}), ACTIONS.talk({text: t.scenes.elmWorkshopByElm.elmStartDialog})],
        },
      ]}
    >
      <DeskPoi />
      <ElmDeskPoi />
      <StairsPoi />
      <HazelExitPoi />
      <HazelSitPoi />
      <HazelPoi />
    </Scene>
  );
};

export default ElmWorkshopByElmScene;
