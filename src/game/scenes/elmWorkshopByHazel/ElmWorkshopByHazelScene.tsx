import React from 'react';
import Scene from '../../../engine/scene/Scene';
import {SOUNDS_TRACKS} from '../../sounds/sounds';
import SCENES from '../scenes';
import elmWorkshop from './assets/images/elmWorkshop.jpg';
import DeskPoi from './pois/DeskPoi';
import ElmDeskPoi from './pois/ElmDeskPoi';
import ElmPoi from './pois/ElmPoi';
import HazelExitPoi from './pois/HazelExitPoi';
import HazelSitPoi from './pois/HazelSitPoi';
import StairsPoi from './pois/StairsPoi';

const ElmWorkshopByHazelScene = () => {
  return (
    <Scene id={SCENES.elmWorkshopByHazel} image={elmWorkshop} sounds={SOUNDS_TRACKS.storyCombo}>
      <DeskPoi />
      <ElmDeskPoi />
      <ElmPoi />
      <StairsPoi />
      <HazelExitPoi />
      <HazelSitPoi />
    </Scene>
  );
};

export default ElmWorkshopByHazelScene;
