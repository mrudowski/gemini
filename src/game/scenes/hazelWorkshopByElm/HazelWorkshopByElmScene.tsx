import React from 'react';
import Scene from '../../../engine/scene/Scene';
import {SOUNDS_TRACKS} from '../../sounds/sounds';
import SCENES from '../scenes';
import hazelWorkshopByElm from './assets/images/hazelWorkshop1_BW.jpg';
import BoxPoi from './pois/BoxPoi';
import ElmPoi from './pois/ElmPoi';
import FlowersPoi from './pois/FlowersPoi';
import HazelPoi from './pois/HazelPoi';
import StairsPoi from './pois/StairsPoi';
import TablePoi from './pois/TablePoi';

const HazelWorkshopByElmScene = () => {
  return (
    <Scene id={SCENES.hazelWorkshopByElm} image={hazelWorkshopByElm} sounds={SOUNDS_TRACKS.storyCombo}>
      <TablePoi />
      <StairsPoi />
      <HazelPoi />
      <ElmPoi />
      <BoxPoi />
      <FlowersPoi />
    </Scene>
  );
};

export default HazelWorkshopByElmScene;
